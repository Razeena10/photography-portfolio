"use client";

import Image from "next/image";
import { Tab, TabList, TabPanel, TabPanels, TabGroup } from '@headlessui/react';
import "./globals.css";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import { Expletus_Sans } from "next/font/google";

const expletusSans = Expletus_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-expletus-sans",
});

export default function Home() {
  return (
    <>
      <header className={`${expletusSans.variable} fixed top-0 left-0 w-full z-10 bg-transparent px-6 py-4`}>
        <nav className="flex items-center justify-between max-w-5xl mx-auto">

          {/* logo placeholder */}
          <div className="text-white font-bold text-lg">Photography Portfolio</div>

          {/* get in touch button */}
          <button className="bg-white text-black px-4 py-2 rounded">Get in touch</button>
        </nav>
      </header>

      <main className={`${expletusSans.variable} min-h-screen bg-[url('/photography-bg.jpg')] bg-cover bg-center pt-32`}>
        <div className="flex flex-col h-full">
          {/* Tabs at the top */}
          <div className="w-full px-4">
            <TabGroup>
              <TabList className="flex text-white items-center justify-center gap-12">
                <Tab className={({ selected }) => `
                  px-6 py-3 font-medium text-lg transition-all duration-200 outline-none
                  ${classNames("uppercase", 
                    selected ? 'text-white border-b-2 border-white -mb-px' 
                    : 'text-white/60 hover:text-white border-b-2 border-transparent')}
                `}>
                  All
                </Tab>
                <Tab className={({ selected }) => `
                  px-6 py-3 font-medium text-lg transition-all duration-200 outline-none
                  ${classNames("uppercase", 
                    selected ? 'text-white border-b-2 border-white -mb-px' 
                    : 'text-white/60 hover:text-white border-b-2 border-transparent')}
                `}>
                  Oceans
                </Tab>
                <Tab className={({ selected }) => `
                  px-6 py-3 font-medium text-lg transition-all duration-200 outline-none
                  ${classNames("uppercase", 
                    selected ? 'text-white border-b-2 border-white -mb-px' 
                    : 'text-white/60 hover:text-white border-b-2 border-transparent')}
                `}>
                  Forests
                </Tab>
              </TabList>
              <TabPanels className="text-center mt-4 text-white bg-stone-90 bg-opacity-80px p-4 sm:p-8 min-h-[65vh] max-w-5xl mx-auto">
                <TabPanel className="">
                  <Masonry  
                    breakpointCols={2}
                    className="flex gap-4 -ml-4 w-auto my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    <Image
                      src="/ocean-1.jpg"
                      alt="Photo 1"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                    <Image
                      src="/ocean-2.jpg"
                      alt="Photo 2"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                    <Image
                      src="/ocean-3.jpg"
                      alt="Photo 3"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                    <Image
                      src="/ocean-4.jpg"
                      alt="Photo 4"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                    <Image
                      src="/ocean-5.jpg"
                      alt="Photo 5"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                    <Image
                      src="/ocean-6.jpg"
                      alt="Photo 6"
                      width={300}
                      height={400}
                      className="w-full rounded-lg mb-4"
                    />
                  </Masonry> 
                </TabPanel>
                <TabPanel>Oceans</TabPanel> 
                <TabPanel>Forests</TabPanel>
              </TabPanels>
            </TabGroup>
          </div>

          
        </div>
      </main>
      <footer className={`${expletusSans.variable} bg-transparent text-center py-4`}>
        <p className="text-black text-sm">
          &copy; {new Date().getFullYear()} Photography Portfolio. All rights reserved.
        </p>
      </footer>
    </>
  );
}
