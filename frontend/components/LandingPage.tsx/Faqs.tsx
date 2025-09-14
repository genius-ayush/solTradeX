import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faqs() {
  return (
    <div className="border border-t w-full pb-20 border-neutral-400/80 dark:border-neutral-800/80">
      {/* Heading */}
      <div className="text-center dark:text-white text-black text-fd-primary-foreground px-2 text-2xl font-semibold pt-10 pb-10">
        FAQs
      </div>

      {/* Responsive Container */}
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base sm:text-lg">
                What is SolBot?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-sm sm:text-base font-extralight">
                <p>
                  SolBot is a Telegram/Discord-style bot built on Solana that lets
                  you create wallets, send SOL, buy tokens, and manage funds
                  directly from chat.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2 ">
              <AccordionTrigger className="text-base sm:text-lg">
                Which network does SolBot currently support?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-sm sm:text-base font-extralight">
                <p>
                  Right now, SolBot works on Solana Devnet for testing and
                  development. Mainnet support is coming soon.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base sm:text-lg">
                Do I need a Solana wallet to use SolBot?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-sm sm:text-base font-extralight">
                <p>
                  No. SolBot can automatically generate a new wallet for you, or
                  you can connect your existing one.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base sm:text-lg">
                How do I fund my wallet on Devnet?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-sm sm:text-base font-extralight">
                <p>
                  You can request free SOL from the Fund Button from our bot and
                  it will airdrop to your SolBot-generated wallet.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base sm:text-lg">
                Is SolBot safe to use?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-sm sm:text-base font-extralight">
                <p>
                  Yes. SolBot doesn’t store your private keys on centralized
                  servers. All transactions are signed securely, and you can eject
                  your funds anytime.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
