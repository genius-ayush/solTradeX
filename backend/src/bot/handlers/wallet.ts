import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { User } from "../../db";
import { bot } from "..";
import { connection } from "../..";
import { Markup } from "telegraf";

bot.action("wallet" , async(ctx)=>{
    try{
        const userId = ctx.from?.id ; 

        if(!userId){
            await ctx.reply("Unable to identify user.") ; 
            return ; 
        }

        const wallet = await User.findOne({userId}) ; 
        if(!wallet){
            await ctx.reply("No wallet found. please use /start to create a wallet first");
            return ; 
        }

        const publicKey = new PublicKey(wallet.publicKey!) ; 
        const account = await connection.getAccountInfo(publicKey) ; 

        await ctx.reply(
            ` 🔑 Publickey: \`${wallet.publicKey}\` \n\n 💰 Balance : ${(account?.lamports!/LAMPORTS_PER_SOL)} \n\n` , {parse_mode :"Markdown"}); 


            await ctx.reply(
                "Choose an option:",
                Markup.inlineKeyboard([
                  [Markup.button.callback(" 🔐Get SecretKey", "secretKey")],
                  [Markup.button.callback("🔙 back", "back")],
                ])
              );
            
    }catch(err){
        console.error("Error getting wallet information" , err); 
        await ctx.reply("Error retrieving wallet information. Please try again") ; 
    }
})