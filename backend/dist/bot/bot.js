"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const https_1 = require("https");
console.log(process.env.BOT_TOKEN);
exports.bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN, {
    telegram: {
        agent: new https_1.Agent({ family: 4 })
    }
});
console.log("Bot initialized successfully");
require("./handlers/back");
require("./handlers/balance");
require("./handlers/fund");
require("./handlers/help");
require("./handlers/secretKey");
require("./handlers/send");
require("./handlers/start");
require("./handlers/wallet");
