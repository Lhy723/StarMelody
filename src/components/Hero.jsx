import { ArrowDown, Snowflake } from "lucide-react";
import { avatars, heroArt } from "../data/ocAssets";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Starmelody</h1>
        <p>
          雪色长发、星屑发饰、云朵挂坠与冰蓝旋律组成的原创角色档案馆。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#gallery">
            看插画
            <ArrowDown size={18} />
          </a>
          <a className="secondary-action" href="#profile">
            角色档案
          </a>
        </div>
      </div>

      <div className="hero-stage" aria-label="角色雪夜主视觉">
        <img src={heroArt} alt="Starmelody 在雪夜街灯下回眸" />
        <div className="orbit-card constellation">
          <Snowflake size={18} />
          <span>snow-blue aura</span>
        </div>
        <div className="avatar-stack" aria-label="头像预览">
          {avatars.map((avatar) => (
            <img key={avatar.title} src={avatar.src} alt={avatar.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
