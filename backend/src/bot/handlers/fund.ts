import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "../..";
import { User } from "../../db";
import { bot } from "..";
import { Markup } from "telegraf";

bot.action("fund_wallet" , async(ctx)=>{
    
    const userId = ctx.from?.id ; 
    if(!userId){
        return ; 
    }
    
    try{
        const user = await User.findOne({userId}) ; 
        const publicKey = new PublicKey(user?.publicKey!) ; 
        const sig = await connection.requestAirdrop( publicKey , 1*LAMPORTS_PER_SOL) ; 
        await ctx.reply(
            // `Wallet funded with 1 SOL (Devnet)\n\nTx Signature:\n\${sig}\\n\n`
            `Wallet funded with 1 SOL(DEVNET)\n\n Signature:\n\`${sig}\`\n\n` , {parse_mode :"Markdown"}
        )
        await ctx.reply(
            "Choose an option:",
            Markup.inlineKeyboard([
              [Markup.button.callback("💰 Balance", "balance")],
              [Markup.button.callback("📤 Send SOL", "send_sol")],
              [Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
              [Markup.button.callback("💳 Wallet", "wallet")],
            ])
          );
    }catch(error){
        console.error(error) ; 
        await ctx.reply('funding failed , try again') ;
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
})