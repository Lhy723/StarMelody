const SIZE = 420;
const GRID = 110;
const CENTER = SIZE / 2;
const FRAME_INTERVAL = 1000 / 30;
const INTRO_DURATION = 950;
const RIPPLE_DURATION = 720;
const STEP = 3.25;

// Cloud Bell's hair and shoulders, traced independently of the postcard frame.
const SILHOUETTE = "M22 350 Q16 330 31 310 Q30 295 42 281 Q23 266 29 239 Q29 226 39 214 L36 198 L42 180 L39 166 L51 161 L63 169 Q69 120 108 88 Q139 66 174 60 Q158 43 176 33 Q193 22 207 32 Q225 39 220 51 L207 55 Q213 37 194 37 Q179 43 188 60 Q251 65 276 110 Q293 134 297 174 L309 170 L318 176 L311 193 L321 208 L314 219 Q333 239 326 260 L336 277 Q344 290 330 303 Q345 318 347 350 Z";

function samplePortrait(image) {
  const bitmap = document.createElement("canvas");
  bitmap.width = GRID;
  bitmap.height = GRID;
  const sampler = bitmap.getContext("2d");
  if (!sampler) return new Map();

  sampler.scale(GRID / 360, GRID / 360);
  sampler.clip(new Path2D(SILHOUETTE));
  sampler.drawImage(image, 0, 0, 360, 360);
  const pixels = sampler.getImageData(0, 0, GRID, GRID).data;
  const shades = new Map();

  for (let row = 0; row < GRID; row += 1) {
    for (let col = 0; col < GRID; col += 1) {
      const offset = (row * GRID + col) * 4;
      if (pixels[offset + 3] < 150) continue;
      const red = pixels[offset];
      const blue = pixels[offset + 2];
      const tone = 1 - (red * 0.28 + pixels[offset + 1] * 0.57 + blue * 0.15) / 255;
      const seed = Math.imul(row * GRID + col + 1, 0x45d9f3b);
      const hash = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
      const noise = ((hash ^ (hash >>> 16)) >>> 0) / 2 ** 32;
      const fade = Math.min(1, (GRID - row - 2) / 14);
      if (fade <= 0 || noise > Math.min(1, 0.47 + tone * 2) * fade) continue;

      const ink = Math.min(1, tone * 2.3);
      const color = red > blue + 6 ? "86,61,150" : "32,57,158";
      const alpha = Math.round(Math.min(0.95, (0.40 + ink * 0.60) * fade) * 14) / 14;
      const shade = `rgba(${color},${alpha})`;
      if (!shades.has(shade)) shades.set(shade, []);
      const angle = noise * Math.PI * 2;
      shades.get(shade).push({
        row,
        x: (col - GRID / 2) * STEP + CENTER,
        y: (row - GRID / 2) * STEP + CENTER,
        size: 1.2 + ink * 1.65,
        driftX: Math.cos(angle) * (44 + noise * 133),
        driftY: Math.sin(angle) * (36 + noise * 95),
      });
    }
  }
  return shades;
}

export function mountPortrait(stage, canvas, toggle) {
  const image = stage.querySelector("img");
  const context = canvas.getContext("2d");
  const shades = samplePortrait(image);
  if (!context || !shades.size) return;

  const listeners = new AbortController();
  const { signal } = listeners;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const density = Math.min(2, window.devicePixelRatio || 1);
  const drift = new Float32Array(GRID);
  const flare = new Float32Array(GRID);
  canvas.width = SIZE * density;
  canvas.height = SIZE * density;
  context.scale(density, density);

  let paused = false;
  let visible = true;
  let target = null;
  const pointer = { x: CENTER, y: CENTER, strength: 0 };
  let ripple = null;
  let frame = 0;
  let lastFrame = null;
  let elapsed = 0;
  let introDone = false;
  const canAnimate = () => !paused && !motion.matches;

  function draw(time, animated) {
    const progress = animated && !introDone ? Math.min(1, time / INTRO_DURATION) : 1;
    const swirl = (1 - progress) ** 2;
    const spin = swirl * 0.68;
    const sin = Math.sin(spin);
    const cos = Math.cos(spin);
    const scanY = (time % 3500) / 3500 * (SIZE + 132) - 66;

    for (let row = 0; row < GRID; row += 1) {
      const y = (row - GRID / 2) * STEP + CENTER;
      const band = Math.max(0, 1 - Math.abs(y - scanY) / 50);
      drift[row] = animated ? Math.sin(time / 640 + row * 0.105) * (2.1 + band * 5.5) : 0;
      flare[row] = animated ? band * band * 0.9 : 0;
    }

    pointer.strength += ((target ? 1 : 0) - pointer.strength) * 0.25;
    if (target) {
      pointer.x += (target.x - pointer.x) * 0.23;
      pointer.y += (target.y - pointer.y) * 0.23;
    }
    if (ripple && time - ripple.start >= RIPPLE_DURATION) ripple = null;
    const rippleAge = ripple ? (time - ripple.start) / RIPPLE_DURATION : 1;
    const radius = 13 + rippleAge * 235;

    context.clearRect(0, 0, SIZE, SIZE);
    context.globalAlpha = 0.3 + 0.7 * (1 - swirl);
    for (const [shade, points] of shades) {
      context.fillStyle = shade;
      for (const point of points) {
        const offsetX = point.x - CENTER;
        const offsetY = point.y - CENTER;
        let x = CENTER + offsetX * cos - offsetY * sin + point.driftX * swirl + drift[point.row];
        let y = CENTER + offsetX * sin + offsetY * cos + point.driftY * swirl;
        if (animated && pointer.strength > 0.01) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 96) {
            const push = (1 - distance / 96) ** 2 * 75 * pointer.strength / distance;
            x += dx * push;
            y += dy * push;
          }
        }
        if (animated && ripple) {
          const dx = x - ripple.x;
          const dy = y - ripple.y;
          const distance = Math.hypot(dx, dy);
          const wave = 1 - Math.abs(distance - radius) / 36;
          if (distance > 0 && wave > 0) {
            const push = wave * wave * (1 - rippleAge) * 42 / distance;
            x += dx * push;
            y += dy * push;
          }
        }

        const size = point.size + flare[point.row];
        context.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }

    if (animated && ripple) {
      context.globalAlpha = (1 - rippleAge) * 0.64;
      context.strokeStyle = "#304dc0";
      context.lineWidth = 1.2;
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function tick(time) {
    if (lastFrame === null || time - lastFrame >= FRAME_INTERVAL - 2) {
      if (lastFrame !== null) elapsed += Math.min(64, time - lastFrame);
      lastFrame = time;
      draw(elapsed, true);
      introDone ||= elapsed >= INTRO_DURATION;
    }
    frame = requestAnimationFrame(tick);
  }

  function syncMotion() {
    const enabled = canAnimate();
    const running = enabled && visible && !document.hidden;
    stage.toggleAttribute("data-running", running);
    toggle.hidden = motion.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    if (running) {
      if (!frame) frame = requestAnimationFrame(tick);
      return;
    }

    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = null;
    if (!enabled) {
      introDone = true;
      target = null;
      ripple = null;
      pointer.strength = 0;
      draw(elapsed, false);
    }
  }

  function origin(event) {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) / bounds.width * SIZE,
      y: (event.clientY - bounds.top) / bounds.height * SIZE,
    };
  }

  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || !canAnimate()) return;
    const next = origin(event);
    if (!target) Object.assign(pointer, next);
    target = next;
  }, { signal });
  canvas.addEventListener("pointerleave", () => { target = null; }, { signal });
  canvas.addEventListener("click", (event) => {
    if (canAnimate()) ripple = { ...origin(event), start: elapsed };
  }, { signal });
  toggle.addEventListener("click", () => {
    paused = !paused;
    syncMotion();
  }, { signal });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncMotion();
  });
  observer.observe(canvas);
  motion.addEventListener("change", syncMotion, { signal });
  document.addEventListener("visibilitychange", syncMotion, { signal });
  canvas.hidden = false;
  draw(0, canAnimate());
  syncMotion();

  return () => {
    listeners.abort();
    observer.disconnect();
    cancelAnimationFrame(frame);
  };
}
