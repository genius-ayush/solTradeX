import { Crosshair, KeyboardIcon, LayoutIcon, LineChart, LucideIcon, MousePointer, PersonStandingIcon, RocketIcon, ServerIcon, ShieldCheck, SlidersHorizontal, TimerIcon, Wallet, Zap } from "lucide-react";
import { ReactNode } from "react";

export  function Features() {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-full flex flex-row items-start justify-center border-l  p-8 pb-2 text-center">
        <h2 className="dark:bg-white bg-black text-white dark:text-black text-fd-primary-foreground px-1 text-2xl font-semibold">
          Highlights
        </h2>
        <MousePointer className="-ml-1 mt-8" />
      </div>
      <Highlight icon={Zap} heading="Instant Trading.">
      Execute buys, sells, and swaps on Solana at lightning speed.
      </Highlight>
      <Highlight icon={Crosshair} heading="Sniping Made Easy.">
      Auto-snipe new token launches the second liquidity is added.
      </Highlight>
      <Highlight icon={Wallet} heading="Multi-Wallet Support.">
      Manage and trade across multiple Solana wallets seamlessly.
      </Highlight>
      <Highlight icon={ShieldCheck} heading="Safety First. ">
      Rug-check, anti-MEV protection, and transaction simulations by default.
      </Highlight>
      <Highlight icon={SlidersHorizontal} heading="Customizable.">
      Set slippage, gas priority, and trading strategies your way.
      </Highlight>
      <Highlight icon={LineChart} heading="Insights & Alerts.">
      Get real-time trade alerts, wallet tracking, and market analytics.
      </Highlight>
    </div>
  );
}

export default function Highlight({
  icon: Icon,
  heading,
  children,
}: {
  icon: LucideIcon;
  heading: ReactNode;
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="border-l border-t px-6 py-12 border-neutral-400/80 dark:border-neutral-800/80">
      <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
        <Icon className="size-4" />
        <h2 className="text-sm font-medium">{heading}</h2>
      </div>
      <span className="font-medium">{children}</span>
    </div>
  );
}