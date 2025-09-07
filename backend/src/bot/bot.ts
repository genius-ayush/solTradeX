import { Telegraf } from "telegraf";
import { Agent } from "https";

export const bot = new Telegraf(process.env.BOT_TOKEN as string, {
    telegram: {
      agent: new Agent({ family: 4 }) 
    }
});

console.log("Bot initialized successfully");
 