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
const db_1 = require("../../db");
const __1 = require("..");
__1.bot.action("secretKey", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        yield ctx.reply("Unable to identify user.");
        return;
    }
    yield ctx.reply("⚠️ *Warning!*\n\nNever share your secret key or seed phrase with anyone. If someone gets it, they can steal all your funds.", Object.assign({ parse_mode: "Markdown" }, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("🔑 Show Secret Key", `reveal_secret_${userId}`)],
        [telegraf_1.Markup.button.callback("🔙 back", "back")]
    ])));
}));
__1.bot.action(/reveal_secret_(.+)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.match[1];
    const wallet = yield db_1.User.findOne({ userId });
    if (!wallet) {
        yield ctx.reply("No wallet found.");
        return;
    }
    const secretKey = wallet.privateKey;
    const masked = secretKey === null || secretKey === void 0 ? void 0 : secretKey.split(" ").map(() => "***").join(" ");
    yield ctx.reply(`🔐 Your secret phrase:\n\n${masked}\n\nClick below to copy.`, Object.assign({}, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("📋 Copy Secret Key", `copy_secret_${userId}`)],
        [telegraf_1.Markup.button.callback("🔙 back", "back")],
    ])));
}));
__1.bot.action(/copy_secret_(.+)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.match[1];
    const wallet = yield db_1.User.findOne({ userId });
    if (!wallet) {
        yield ctx.reply("No wallet found.");
        return;
    }
    const secretKeyPhrase = wallet.privateKey;
    yield ctx.reply(`📋 *Copy your secret phrase below:*\n\n\`${secretKeyPhrase}\``, { parse_mode: "Markdown" });
    yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("🔙 back", "back")],
    ]));
}));
