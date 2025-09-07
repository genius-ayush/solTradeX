import { bot } from "../bot";
import { wallets } from "../..";
import { Markup } from "telegraf";
import { Keypair } from "@solana/web3.js";
import { User } from "../../db";
import bs58 from 'bs58'


bot.start(async (ctx) => {
  try {
    console.log("Start command received");
    const userId = ctx.from?.id;
    
    if (!userId) {
      console.log("No user ID found");
      return;
    }

    console.log(`Processing start for user: ${userId}`);

    // Create wallet if it doesn't 
    var user = await User.findOne({userId}) ; 

    if (!user) {
      console.log(`Creating new wallet for user: ${userId}`);
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toString(); 
      const privateKeyUint8Array = keypair.secretKey ;
      const privateKey = bs58.encode(privateKeyUint8Array) ; 
      const newUser  = new User({userId , publicKey , privateKey })
      await newUser.save() ;
      user = newUser;
    } else {
      console.log(`Wallet already exists for user: ${userId}`);
    }
    
    console.log(`Wallet address: ${user.publicKey}`);

    await ctx.reply(
      ` Welcome to SolTradeX!\n\nYour Solana wallet has been created.\n\n💳 Address:\n\`${user.publicKey}\`\n\nFund it with SOL to get started.`,
      { parse_mode: "Markdown" }
    );

    await ctx.reply(
      "Choose an option:",
      Markup.inlineKeyboard([
        [Markup.button.callback("💰 Balance", "balance")],
        [Markup.button.callback("📤 Send SOL", "send_sol")],
        [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
        [Markup.button.callback("💳 Wallet", "wallet")],
      ])
    );

    console.log("Start command completed successfully");
  } catch (error) {
    console.error("Error in start command:", error);
    await ctx.reply(" An error occurred while setting up your wallet. Please try again.");
  }
}); 