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
const __2 = require("..");
const telegraf_1 = require("telegraf");
__2.bot.action("fund_wallet", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return;
    }
    try {
        const user = yield db_1.User.findOne({ userId });
        const publicKey = new web3_js_1.PublicKey(user === null || user === void 0 ? void 0 : user.publicKey);
        const sig = yield __1.connection.requestAirdrop(publicKey, 1 * web3_js_1.LAMPORTS_PER_SOL);
        yield ctx.reply(
        // `Wallet funded with 1 SOL (Devnet)\n\nTx Signature:\n\${sig}\\n\n`
        `Wallet funded with 1 SOL(DEVNET)\n\n Signature:\n\`${sig}\`\n\n`, { parse_mode: "Markdown" });
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
        ]));
    }
    catch (error) {
        console.error(error);
        yield ctx.reply('funding failed , try again');
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
        ]));
    }
}));
