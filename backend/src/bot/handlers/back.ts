import { Markup } from "telegraf";
import { bot } from "..";

bot.action("back" , async(ctx)=>{
    
    await ctx.reply(
        "Choose an option:",
        Markup.inlineKeyboard([
          [Markup.button.callback("💰 Balance", "balance")],
          [Markup.button.callback("📤 Send SOL", "send_sol")],
          [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
          [Markup.button.callback("💳 Wallet", "wallet")],
        ])
      );
})