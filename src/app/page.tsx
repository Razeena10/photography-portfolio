"use client";

import Image from "next/image";
import { Tab, TabList, TabPanel, TabPanels, TabGroup } from "@headlessui/react";
import "./globals.css";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import { Expletus_Sans } from "next/font/google";
import photographyBg from "../../public/photography-bg.jpg";
import LightGalleryComponent from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import type { LightGallery } from "lightgallery/lightgallery";
import { useRef, useState, useEffect } from "react";

interface UnsplashPhoto {
  id: string;
  urls: { small: string; regular: string; full: string };
}

const expletusSans = Expletus_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-expletus-sans",
});

export default function Home() {
  const [oceanPhotos, setOceanPhotos] = useState<UnsplashPhoto[]>([]);
  const [forestPhotos, setForestPhotos] = useState<UnsplashPhoto[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const lightBoxRef = useRef<LightGallery | null>(null);

  useEffect(() => {
    async function fetchCategory(query: string, setter: (data: UnsplashPhoto[]) => void) {
      try {
        const url = `https://api.unsplash.com/photos/random?count=10&query=${encodeURIComponent(
          query
        )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Unsplash error: ${res.status}`);
        const data: UnsplashPhoto[] = await res.json();
        setter(data);
      } catch (err) {
        console.error("Unsplash fetch failed", err);
      }
    }

    fetchCategory("ocean sea water", setOceanPhotos);
    fetchCategory("forest trees nature", setForestPhotos);
  }, []);

  const allPhotos = [...oceanPhotos, ...forestPhotos];

  const renderGallery = (photos: UnsplashPhoto[]) => (
    <>
      <Masonry
        breakpointCols={2}
        className="flex gap-4 -ml-4 w-auto my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((p, index) => (
          <div key={p.id} className="relative">
            <Image
              src={p.urls.small}
              alt={`Photo ${index + 1}`}
              width={300}
              height={400}
              className="w-full rounded-lg mb-4 hover:opacity-80 cursor-pointer transition-opacity duration-200"
              onClick={() => lightBoxRef.current?.openGallery(index)}
            />
          
          </div>
        ))}
      </Masonry>

      <LightGalleryComponent
        onInit={(ref) => {
          lightBoxRef.current = ref.instance;
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((p) => ({
          src: p.urls.regular,   // high-res for zoom
          thumb: p.urls.small,   // thumbnail
        }))}
      />
    </>
  );

  return (
    <>
      {/* Background */}
      <Image
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={photographyBg}
        alt="background-image"
        placeholder="blur"
      />
      <div className="fixed left-0 top-0 w-full h-full z-10 from-stone-900 bg-gradient-to-t"></div>

      {/* Header */}
      <header
        className={`${expletusSans.variable} fixed top-0 left-0 w-full z-30 bg-transparent px-6 py-4`}
      >
        <nav className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="text-white font-bold text-lg">Photography Portfolio</div>
          <div className="relative">
            <button
              onClick={() => setContactOpen((o) => !o)}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Get in touch
            </button>
            {contactOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2">
                <a
                  href="https://www.linkedin.com/in/md-razeena-nishad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1 hover:bg-gray-200"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Razeena10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1 hover:bg-gray-200"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main */}
      <main
        className={`${expletusSans.variable} min-h-screen pt-32 z-20 relative`}
        style={{
          backgroundImage: `url(${photographyBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="w-full px-4">
            <TabGroup>
              <TabList className="flex text-white items-center justify-center gap-12">
                {["All", "Oceans", "Forests"].map((label) => (
                  <Tab
                    key={label}
                    className={({ selected }) =>
                      classNames(
                        "uppercase px-6 py-3 font-medium text-lg transition-all duration-200 outline-none",
                        selected
                          ? "text-white border-b-2 border-white -mb-px"
                          : "text-white/60 hover:text-white border-b-2 border-transparent"
                      )
                    }
                  >
                    {label}
                  </Tab>
                ))}
              </TabList>

              <TabPanels className="text-center mt-4 text-white bg-stone-900 bg-opacity-50 p-4 sm:p-8 min-h-[65vh] max-w-5xl mx-auto">
                <TabPanel>{renderGallery(allPhotos)}</TabPanel>
                <TabPanel>{renderGallery(oceanPhotos)}</TabPanel>
                <TabPanel>{renderGallery(forestPhotos)}</TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`${expletusSans.variable} bg-transparent text-center py-4 z-20 relative`}
      >
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} Photography Portfolio. All rights reserved.
        </p>
      </footer>
    </>
  );
}