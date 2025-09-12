"use client";


import { motion } from "motion/react";

export default function Hero() {
  return (
    
    <div className="px-4 py-10 md:py-20 h-screen mt-32">
    <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-mono font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
      {"Solbot – The Ultimate Solana Telegram Bot"
        .split(" ")
        .map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
    </h1>
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
      <button className=" transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5   dark:bg-white dark:text-black  hidden md:block text-md light:bg-gradient-to-b from-gray-800 to-black  shadow-md hover:opacity-90 ">
        START TRADING
      </button>
     
    </motion.div>
    
  </div>
    
  );
}


