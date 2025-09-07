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
const web3_js_1 = require("@solana/web3.js");
const __1 = require("../..");
const db_1 = require("../../db");
const telegraf_1 = require("telegraf");
const __2 = require("..");
__2.bot.action("balance", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            yield ctx.reply("Unable to identify user.");
            return;
        }
        const wallet = yield db_1.User.findOne({ userId });
        if (!wallet) {
            yield ctx.reply("No wallet found. Please use /start to create a wallet first.");
            return;
        }
        const publicKey = new web3_js_1.PublicKey(wallet.publicKey);
        // console.log(publicKey) ; 
        const balance = yield __1.connection.getBalance(publicKey);
        yield ctx.reply(`💰 Balance: ${(balance / web3_js_1.LAMPORTS_PER_SOL).toFixed(2)} SOL`);
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
        ]));
    }
    catch (error) {
        console.error("Error checking balance:", error);
        yield ctx.reply(" Error retrieving balance. Please try again.");
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
        ]));
    }
}));
