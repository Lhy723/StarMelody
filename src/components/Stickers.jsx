import { stickers } from "../data/ocAssets";
import SectionHeader from "./SectionHeader";

export default function Stickers({ onOpenImage }) {
  return (
    <section className="stickers-section" id="stickers">
      <SectionHeader eyebrow="stickers" title="表情包像散落的糖霜">
        笑、困、发呆和一点点撒娇，都被轻轻收进同一场雪里。
      </SectionHeader>

      <div className="sticker-cloud" aria-label="表情包列表">
        {stickers.map((sticker, index) => (
          <button
            key={sticker.id}
            className="sticker"
            style={{ "--tilt": `${(index % 5) * 3 - 6}deg` }}
            type="button"
            onClick={() => onOpenImage(sticker)}
          >
            <img src={sticker.src} alt={sticker.title} loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}
