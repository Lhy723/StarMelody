import { Github, Sparkles } from "lucide-react";

const githubUrl = "https://github.com/Lhy723/StarMelody";

export default function Header() {
  const links = [
    ["profile", "档案"],
    ["gallery", "画廊"],
    ["stickers", "表情"],
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Starmelody home">
        <span className="brand-mark">
          <Sparkles size={18} strokeWidth={2.2} />
        </span>
        <span>Starmelody</span>
      </a>
      <nav aria-label="主要导航">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
        <a
          className="github-link"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
        >
          <Github size={17} />
          <span>GitHub</span>
        </a>
      </nav>
    </header>
  );
}
