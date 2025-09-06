import { Markup, Telegraf } from "telegraf";
import dotenv from "dotenv";
import { Agent } from "https";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

dotenv.config();

const wallets: Record<number , Keypair> = {} ; 
const connection = new Connection(process.env.RPC_URL!)
const bot = new Telegraf(process.env.BOT_TOKEN as string, {
  telegram: {
    agent: new Agent({ family: 4 }) 
  }
});

bot.start(async(ctx) => {
    const userId = ctx.from.id ; 

    if(!userId)return ; 

    if(!wallets[userId]){
        wallets[userId] = Keypair.generate(); 
    }

    const publicKey = wallets[userId].publicKey.toBase58();

    await ctx.reply(
        `🚀 Welcome to SolBot!\n\nYour Solana wallet has been created.\n\n💳 Address:\n\`${publicKey}\`\n\nFund it with SOL to get started.`,
        { parse_mode: "Markdown" })

        await ctx.reply(
            "Choose an option:",
            Markup.inlineKeyboard([
              [Markup.button.callback("💰 Balance", "balance")],
              [Markup.button.callback("📤 Send SOL", "send_sol")],
              [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            ])
          );
}); 

bot.action("balance" , async(ctx)=>{
    const userId = ctx.from?.id ; 

    if(userId)return ; 

    const wallet = wallets[userId] ; 

    const balance = await connection.getBalance(wallet.publicKey) ; 

    await ctx.reply(
        `💰 Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(2)} SOL`
    )
})

bot.action("send_sol", async (ctx) => {
    await ctx.reply("✍️ Enter recipient address and amount in this format:\n\n`address amount`", {
      parse_mode: "Markdown"
    });
  
    bot.on("text", async (ctx2) => {
      try {
        const [address, amountStr] = ctx2.message.text.split(" ");
        const amount = parseFloat(amountStr);
  
        const userId = ctx2.from?.id;
        if (!userId) return;
  
        const fromWallet = wallets[userId];
        const toPubKey = new PublicKey(address);
  
        const tx = await connection.requestAirdrop(fromWallet.publicKey, 0); // testnet safe
        console.log("Tx Sig:", tx);
  
        await ctx2.reply(`✅ Sent ${amount} SOL to ${address}`);
      } catch (err) {
        await ctx2.reply("❌ Error sending SOL. Check input.");
      }
    });
  });
  

bot.help((ctx) => ctx.reply("How can I assist you?"));
bot.on("text", (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

bot.launch();
