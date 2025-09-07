import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection,  } from "../..";
import { User } from "../../db";
import { Markup } from "telegraf";
import { bot } from "..";

bot.action("balance", async (ctx) => {

  console.log("reched to balance") ; 
  try {
    const userId = ctx.from?.id;
    if (!userId) {
      await ctx.reply("Unable to identify user.");
      return;
    }

    const wallet = await User.findOne({userId}) ; 
    if (!wallet) {
      await ctx.reply("No wallet found. Please use /start to create a wallet first.");
      return;
    }
    const publicKey = new PublicKey(wallet.publicKey!)
    // console.log(publicKey) ; 
    const balance = await connection.getBalance(publicKey);
    await ctx.reply(
      `💰 Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(2)} SOL`
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
  } catch (error) {
    console.error("Error checking balance:", error);
    await ctx.reply(" Error retrieving balance. Please try again.");
    await ctx.reply(
      "Choose an option:",
      Markup.inlineKeyboard([
        [Markup.button.callback("💰 Balance", "balance")],
        [Markup.button.callback("📤 Send SOL", "send_sol")],
        [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
        [Markup.button.callback("💳 Wallet", "wallet")],
      ])
    );
  }
});