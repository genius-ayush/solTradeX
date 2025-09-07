// instead of sendAndConfirmTransaction
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { bot, connection } from "../..";
// import { bot } from "..";
import { User } from "../../db";
import bs58 from 'bs58'
import { Markup } from "telegraf";

bot.action("send_sol", async (ctx) => {
  try {
    const userId = ctx.from?.id;
    if (!userId) {
      await ctx.reply(" Unable to identify user.");
      return;
    }

    const wallet = await User.findOne({ userId });
    if (!wallet) {
      await ctx.reply(" No wallet found. Please use /start to create a wallet first.");
      return;
    }

    await ctx.reply("✍️ Enter recipient address and amount in this format:\n\n`address amount`", {
      parse_mode: "Markdown"
    });

    const textHandler = async (ctx2: any) => {
      try {
        if (ctx2.from?.id !== userId) return;

        const [address, amountStr] = ctx2.message.text.split(" ");
        const amount = parseFloat(amountStr);

        if (!address || isNaN(amount) || amount <= 0) {
          await ctx2.reply("Invalid format. Use: `address amount`");
          return;
        }

        const fromWallet = new PublicKey(wallet.publicKey!);
        const toPubKey = new PublicKey(address);
        const secretKey = bs58.decode(wallet.privateKey!);
        const keyPair = Keypair.fromSecretKey(secretKey);

        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: fromWallet,
            toPubkey: toPubKey,
            lamports: Math.floor(amount * 1_000_000_000),
          })
        );

        
        const signature = await connection.sendTransaction(transaction, [keyPair]);
        console.log("Transaction signature:", signature);

        
        const latestBlockhash = await connection.getLatestBlockhash();
        try {
          await connection.confirmTransaction(
            {
              signature,
              blockhash: latestBlockhash.blockhash,
              lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            },
            "confirmed"
          );
        } catch (confirmErr) {
          console.warn("⚠️ Confirm error, checking status manually:", confirmErr);
        }

        // ✅ Double-check if transaction landed
        const txStatus = await connection.getSignatureStatus(signature);
        if (txStatus?.value?.confirmationStatus) {
          await ctx2.reply(
            `✅ Sent ${amount} SOL to ${address}\n\nTransaction: \`${signature}\``,
            { parse_mode: "Markdown" }
          );
        } else {
          await ctx2.reply(
            `⚠️ Transaction may still be processing. Check explorer:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
          );
        }
        await ctx.reply(
          "Choose an option:",
          Markup.inlineKeyboard([
            [Markup.button.callback("💰 Balance", "balance")],
            [Markup.button.callback("📤 Send SOL", "send_sol")],
            [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [Markup.button.callback("💳 Wallet", "wallet")],
          ])
        );
      } catch (err) {
        console.error("Error sending SOL:", err);
        await ctx2.reply(" Error sending SOL. Check address and amount.");
        await ctx2.reply(
          "Choose an option:",
          Markup.inlineKeyboard([
            [Markup.button.callback("💰 Balance", "balance")],
            [Markup.button.callback("📤 Send SOL", "send_sol")],
            [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [Markup.button.callback("💳 Wallet", "wallet")],
          ])
        );
      }
    };

    bot.on("text", textHandler);
  } catch (error) {
    console.error("Error in send_sol action:", error);
    await ctx.reply(" An error occurred. Please try again.");
    await ctx.reply(
      "Choose an option:",
      Markup.inlineKeyboard([
        [Markup.button.callback("💰 Balance", "balance")],
        [Markup.button.callback("📤 Send SOL", "send_sol")],
        [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
      ])
    );
  }
});
