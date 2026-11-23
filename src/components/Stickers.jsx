import { stickers } from "../data/ocAssets";
import SectionHeader from "./SectionHeader";

export default function Stickers({ onOpenImage }) {
  return (
    <section className="stickers-section" id="stickers">
      <SectionHeader title="表情包">
        笑、困、发呆和一点点撒娇，都被轻轻收进同一场雪里。
      </SectionHeader>

      <div className="sticker-cloud" aria-label="表情包列表">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            className="sticker"
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
