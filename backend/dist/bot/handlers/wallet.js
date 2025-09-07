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
const db_1 = require("../../db");
const __1 = require("../..");
const telegraf_1 = require("telegraf");
const __2 = require("..");
__2.bot.action("wallet", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            yield ctx.reply("Unable to identify user.");
            return;
        }
        const wallet = yield db_1.User.findOne({ userId });
        if (!wallet) {
            yield ctx.reply("No wallet found. please use /start to create a wallet first");
            return;
        }
        const publicKey = new web3_js_1.PublicKey(wallet.publicKey);
        const account = yield __1.connection.getAccountInfo(publicKey);
        yield ctx.reply(` 🔑 Publickey: \`${wallet.publicKey}\` \n\n 💰 Balance : ${((account === null || account === void 0 ? void 0 : account.lamports) / web3_js_1.LAMPORTS_PER_SOL)} \n\n`, { parse_mode: "Markdown" });
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback(" 🔐Get SecretKey", "secretKey")],
            [telegraf_1.Markup.button.callback("🔙 back", "back")],
        ]));
    }
    catch (err) {
        console.error("Error getting wallet information", err);
        yield ctx.reply("Error retrieving wallet information. Please try again");
    }
}));
