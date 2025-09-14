"use client";
import Faqs from "./Faqs";
import { Features } from "./Features";
import Footer from "./Footer";
import Gettingstarted from "./Gettingstarted";
import Header from "./Header";
import Hero from "./Hero";

export default function Landing() {
  return (
    <div className="relative   mx-auto flex max-w-5/6 flex-col items-center justify-center font-mono border-t border-neutral-400/80 dark:border-neutral-800/80 ">
      {/* <Header/> */}
      
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-400/80 dark:bg-neutral-800/80">
        {/* <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" /> */}
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-400/80 dark:bg-neutral-800/80">
        {/* <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" /> */}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-400/80 dark:bg-neutral-800/80">
        {/* <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" /> */}
      </div>
      <Hero/>
      <Features/>
      <Faqs/>
      <Gettingstarted/>
    </div>
  );
}


