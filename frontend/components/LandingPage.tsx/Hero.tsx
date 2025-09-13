"use client";


import { motion } from "motion/react";
import { Highlighter } from "../magicui/highlighter";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    
    <div className="px-4 py-10 md:py-20   border-b border-neutral-400/80 dark:border-neutral-800/80 w-full">
      <div className="z-10 flex min-h-32 items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing SolBot</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
    <div className="text-center lg:text-5xl text-4xl mx-auto max-w-4xl">
      <p className="leading-relaxed">
        {/* The{" "} */}
        <Highlighter action="underline" color="#FF9800">
          Solbot-
        </Highlighter>{" "}
        The Ultimate Solana{" "}
        <Highlighter action="highlight" color="#00BFFF" >
        Telegram Bot
        </Highlighter>{" "}
        {/* effortlessly. */}
      </p>
    </div>
    {/* </h1> */}
    <motion.p
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: 0.8,
      }}
      className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
    >
      Trade, snipe, and manage your tokens instantly — all from the comfort of your Telegram chat.
    </motion.p>
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: 1,
      }}
      className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
    >
      <button className=" transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5   dark:bg-white dark:text-black   text-md light:bg-gradient-to-b from-gray-800 to-black  shadow-md hover:opacity-90 mb-28  ">
        START TRADING
      </button>
     
    </motion.div>
    
  </div>
    
  );
}


