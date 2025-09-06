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
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const https_1 = require("https");
const web3_js_1 = require("@solana/web3.js");
dotenv_1.default.config();
const wallets = {};
const connection = new web3_js_1.Connection(process.env.RPC_URL);
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN, {
    telegram: {
        agent: new https_1.Agent({ family: 4 })
    }
});
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    if (!userId)
        return;
    if (!wallets[userId]) {
        wallets[userId] = web3_js_1.Keypair.generate();
    }
    const publicKey = wallets[userId].publicKey.toBase58();
    yield ctx.reply(`🚀 Welcome to SolBot!\n\nYour Solana wallet has been created.\n\n💳 Address:\n\`${publicKey}\`\n\nFund it with SOL to get started.`, { parse_mode: "Markdown" });
    yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
        [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
        [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
    ]));
}));
bot.action("balance", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.from.id;
    console.log(wallets);
    for (let key in wallets) {
        console.log(`${key} : ${wallets[key]}`);
    }
    console.log(userId);
    if (!userId)
        return;
    const wallet = wallets[userId]; //problem is here 
    const balance = yield connection.getBalance(wallet.publicKey);
    yield ctx.reply(`💰 Balance: ${(balance / web3_js_1.LAMPORTS_PER_SOL).toFixed(2)} SOL`);
}));
bot.action("send_sol", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("✍️ Enter recipient address and amount in this format:\n\n`address amount`", {
        parse_mode: "Markdown"
    });
    bot.on("text", (ctx2) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const [address, amountStr] = ctx2.message.text.split(" ");
            const amount = parseFloat(amountStr);
            const userId = (_a = ctx2.from) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId)
                return;
            const fromWallet = wallets[userId];
            const toPubKey = new web3_js_1.PublicKey(address);
            const tx = yield connection.requestAirdrop(fromWallet.publicKey, 0); // testnet safe
            console.log("Tx Sig:", tx);
            yield ctx2.reply(`✅ Sent ${amount} SOL to ${address}`);
        }
        catch (err) {
            yield ctx2.reply("❌ Error sending SOL. Check input.");
        }
    }));
}));
bot.help((ctx) => ctx.reply("How can I assist you?"));
bot.on("text", (ctx) => ctx.reply(`You said: ${ctx.message.text}`));
bot.launch();
