import { useMemo, useState } from "react";
import { Images, LayoutGrid, Snowflake, Sparkles } from "lucide-react";
import { illustrations } from "../data/ocAssets";
import SectionHeader from "./SectionHeader";

const filters = [
  ["all", "全部", LayoutGrid],
  ["snow", "雪色", Snowflake],
  ["dream", "梦境", Sparkles],
  ["city", "街景", Images],
];

export default function Gallery({ onOpenImage }) {
  const [active, setActive] = useState("all");
  const visible = useMemo(
    () =>
      active === "all"
        ? illustrations
        : illustrations.filter((item) => item.tone === active),
    [active],
  );

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-topline">
        <SectionHeader title="插画">
          雪夜、街灯、云朵和柔蓝色的光，留下她经过世界时的微小回声。
        </SectionHeader>
        <div className="filter-bar" aria-label="画廊筛选">
          {filters.map(([id, label, Icon]) => (
            <button
              key={id}
              aria-pressed={active === id}
              type="button"
              onClick={() => setActive(id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="masonry-grid" key={active}>
        {visible.map((item) => (
          <button
            className="art-tile"
            key={item.id}
            type="button"
            onClick={() => onOpenImage(item)}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
