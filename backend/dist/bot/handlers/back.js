"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const __1 = require("..");
__1.bot.action("back", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
        [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
        [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
        [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
    ]));
}));
