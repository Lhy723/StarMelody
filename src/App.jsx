import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Gallery from "./components/Gallery";
import Stickers from "./components/Stickers";
import Lightbox from "./components/Lightbox";

export default function App() {
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Profile onOpenImage={setLightboxImage} />
        <Gallery onOpenImage={setLightboxImage} />
        <Stickers onOpenImage={setLightboxImage} />
      </main>
      <footer>
        <span>Starmelody OC Archive</span>
        <span>snow, cloud, star, melody</span>
      </footer>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}
