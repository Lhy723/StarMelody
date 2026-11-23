import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Lightbox({ image, onClose }) {
  const dialog = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => {
      if (element.open) element.close();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={image.title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current.close();
      }}
    >
      <div className="lightbox-panel">
        <form method="dialog">
          <button className="lightbox-close" type="submit" aria-label="关闭">
            <X size={22} />
          </button>
        </form>
        <img src={image.src} alt={image.title} />
        <p>{image.title}</p>
      </div>
    </dialog>
  );
}
