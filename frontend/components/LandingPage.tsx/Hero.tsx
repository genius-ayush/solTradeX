"use client";

import { motion } from "motion/react";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContainerTextFlip } from "../ui/container-text-flip";
import Link from "next/link";

export default function Hero() {
  const words = ["Telegram Bot", "Wallet"];
  return (
    <div className="px-4 py-10 md:py-20 border-b border-neutral-400/80 dark:border-neutral-800/80 w-full ">
      {/* Top Badge */}
      <div className="z-10 flex min-h-32 items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing SolBot</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mx-auto max-w-4xl px-2">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative mb-6 text-center font-medium tracking-tight text-zinc-700 dark:text-zinc-100",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-snug"
          )}
          layout
        >
          <span className="inline-block">
            SolBot — The Ultimate Solana{" "}
            <ContainerTextFlip words={words} />
          </span>
        </motion.h1>
      </div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="relative z-10 mx-auto max-w-xl py-4 text-center text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400"
      >
        Trade, snipe, and manage your tokens instantly — all from the comfort of your Telegram chat.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="https://t.me/XTradeSolBot"
          target="_blank"
          rel="noopener noreferrer"
        ><button className="transform rounded-lg bg-black px-5 sm:px-6 py-2 sm:py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 dark:bg-white dark:text-black text-sm sm:text-md md:text-lg shadow-md hover:opacity-90">
            START TRADING
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
