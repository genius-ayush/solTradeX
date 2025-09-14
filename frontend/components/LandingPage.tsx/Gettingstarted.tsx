import { Ripple } from "@/components/magicui/ripple";
import Link from "next/link";

export default function Gettingstarted() {
  return (
    <div className="relative flex min-h-[400px] sm:min-h-[500px] w-full flex-col items-center justify-center overflow-hidden border-b border-neutral-400/80 dark:border-neutral-800/80 px-4 ">
      {/* Small heading */}
      <p className="z-10 whitespace-pre-wrap text-center text-lg sm:text-2xl font-medium tracking-tighter mt-10 sm:mt-20">
        Still Here?
      </p>

      {/* Main heading */}
      <p className="text-3xl sm:text-5xl text-center pb-6 sm:pb-10 tracking-tighter  leading-tight">
        Trade on SolBot Now
      </p>

      {/* CTA button */}
      <Link
            href="https://t.me/XTradeSolBot"
            target="_blank"
            rel="noopener noreferrer"
          >
      <button className="transform rounded-lg bg-black px-5 sm:px-6 py-2 sm:py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 dark:bg-white dark:text-black text-sm sm:text-md md:text-lg light:bg-gradient-to-b from-gray-800 to-black shadow-md hover:opacity-90 mb-16 sm:mb-28">
        START TRADING
      </button>
      </Link>
      {/* Background Ripple Effect */}
      <Ripple />
    </div>
  );
}
