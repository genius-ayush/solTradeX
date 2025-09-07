import { Markup } from "telegraf";
import { User } from "../../db";
import { bot } from "../..";
// import { bot } from "..";

bot.action("secretKey" , async(ctx)=>{

    const userId = ctx.from?.id ;

        if(!userId){
            await ctx.reply("Unable to identify user.")
            return ; 
        }

    await ctx.reply(
        "⚠️ *Warning!*\n\nNever share your secret key or seed phrase with anyone. If someone gets it, they can steal all your funds.",
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            [Markup.button.callback("🔑 Show Secret Key", `reveal_secret_${userId}`)],
            [Markup.button.callback("🔙 back", "back")]
          ]),
        }
      );

      

})

bot.action(/reveal_secret_(.+)/ , async(ctx)=>{
    
    const userId = ctx.match[1] ; 

    const wallet = await User.findOne({userId});

    if(!wallet){
        await ctx.reply("No wallet found."); 
        return ; 
    }

    const secretKey = wallet.privateKey ; 

    const masked = secretKey?.split(" ").map(()=>"***").join(" ") ; 

    await ctx.reply(
        `🔐 Your secret phrase:\n\n${masked}\n\nClick below to copy.`,
        {
          ...Markup.inlineKeyboard([
            [Markup.button.callback("📋 Copy Secret Key", `copy_secret_${userId}`)],
            [Markup.button.callback("🔙 back", "back")],
          ]),
        }
      );

})

bot.action(/copy_secret_(.+)/, async (ctx) => {
    const userId = ctx.match[1];
    const wallet = await User.findOne({ userId });
  
    if (!wallet) {
      await ctx.reply("No wallet found.");
      return;
    }
  
    const secretKeyPhrase: string = wallet.privateKey!;
  
    await ctx.reply(
      `📋 *Copy your secret phrase below:*\n\n\`${secretKeyPhrase}\``,
      { parse_mode: "Markdown" }
    );

    await ctx.reply(
        "Choose an option:",
        Markup.inlineKeyboard([
          [Markup.button.callback("🔙 back", "back")],
        ])
      );
  });