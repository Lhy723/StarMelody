import { Cloud, Gem, Music2, Star } from "lucide-react";
import { characterSheets, profileArt } from "../data/ocAssets";
import SectionHeader from "./SectionHeader";

const traits = [
  ["主色", "霜白 / 冰蓝 / 星光银", Gem],
  ["标志", "云朵挂坠、蝴蝶结、星星轨迹", Star],
  ["气质", "轻柔、清澈、带一点冬日距离感", Cloud],
  ["主题", "雪夜散步与低声旋律", Music2],
];

export default function Profile({ onOpenImage }) {
  return (
    <section className="profile-section" id="profile">
      <SectionHeader eyebrow="profile" title="像一首落在雪里的小调">
        霜白长发、冰蓝裙摆、云朵挂坠和星屑发饰，是她最容易被记住的轮廓。
      </SectionHeader>

      <div className="profile-layout">
        <button
          className="profile-portrait"
          type="button"
          onClick={() => onOpenImage({ src: profileArt, title: "Main Look" })}
        >
          <img src={profileArt} alt="Starmelody 全身人设" />
        </button>

        <div className="profile-notes">
          <div className="trait-grid">
            {traits.map(([label, value, Icon]) => (
              <div className="trait" key={label}>
                <Icon size={19} />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="look-rail" aria-label="人设预览">
            {characterSheets.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                onClick={() => onOpenImage(sheet)}
              >
                <img src={sheet.src} alt={sheet.title} />
                <span>{sheet.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
