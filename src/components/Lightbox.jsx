import { X } from "lucide-react";

export default function Lightbox({ image, onClose }) {
  if (!image) {
    return null;
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.title}>
      <button className="lightbox-backdrop" type="button" onClick={onClose} />
      <div className="lightbox-panel">
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭">
          <X size={22} />
        </button>
        <img src={image.src} alt={image.title} />
        <span>{image.title}</span>
      </div>
    </div>
  );
}
