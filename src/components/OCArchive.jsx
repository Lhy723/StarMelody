import { useState } from "react";
import Gallery from "./Gallery";
import Lightbox from "./Lightbox";
import Profile from "./Profile";
import Stickers from "./Stickers";

export default function OCArchive() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <Profile onOpenImage={setLightboxImage} />
      <Gallery onOpenImage={setLightboxImage} />
      <Stickers onOpenImage={setLightboxImage} />
      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  );
}
