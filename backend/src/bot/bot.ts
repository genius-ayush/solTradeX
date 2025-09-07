import { Telegraf } from "telegraf";
import { Agent } from "https";

export const bot = new Telegraf(process.env.BOT_TOKEN as string, {
    telegram: {
      agent: new Agent({ family: 4 }) 
    }
});

import "./handlers/start";
import "./handlers/help";
import "./handlers/send";
import "./handlers/balance";
import "./handlers/fund";
import "./handlers/wallet";
import "./handlers/back";
import "./handlers/secretKey";

console.log("Bot initialized successfully");
 