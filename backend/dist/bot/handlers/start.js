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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const telegraf_1 = require("telegraf");
const web3_js_1 = require("@solana/web3.js");
const db_1 = require("../../db");
const bs58_1 = __importDefault(require("bs58"));
__1.bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("Start command received");
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            console.log("No user ID found");
            return;
        }
        console.log(`Processing start for user: ${userId}`);
        // Create wallet if it doesn't 
        var user = yield db_1.User.findOne({ userId });
        if (!user) {
            console.log(`Creating new wallet for user: ${userId}`);
            const keypair = web3_js_1.Keypair.generate();
            const publicKey = keypair.publicKey.toString();
            const privateKeyUint8Array = keypair.secretKey;
            const privateKey = bs58_1.default.encode(privateKeyUint8Array);
            const newUser = new db_1.User({ userId, publicKey, privateKey });
            yield newUser.save();
            user = newUser;
        }
        else {
            console.log(`Wallet already exists for user: ${userId}`);
        }
        console.log(`Wallet address: ${user.publicKey}`);
        yield ctx.reply(` Welcome to SolTradeX!\n\nYour Solana wallet has been created.\n\n💳 Address:\n\`${user.publicKey}\`\n\nFund it with SOL to get started.`, { parse_mode: "Markdown" });
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
            [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
        ]));
        console.log("Start command completed successfully");
    }
    catch (error) {
        console.error("Error in start command:", error);
        yield ctx.reply(" An error occurred while setting up your wallet. Please try again.");
    }
}));
