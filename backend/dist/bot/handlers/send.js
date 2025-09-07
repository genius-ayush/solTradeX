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
// instead of sendAndConfirmTransaction
const web3_js_1 = require("@solana/web3.js");
const __1 = require("../..");
const __2 = require("..");
const db_1 = require("../../db");
const bs58_1 = __importDefault(require("bs58"));
const telegraf_1 = require("telegraf");
__2.bot.action("send_sol", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            yield ctx.reply(" Unable to identify user.");
            return;
        }
        const wallet = yield db_1.User.findOne({ userId });
        if (!wallet) {
            yield ctx.reply(" No wallet found. Please use /start to create a wallet first.");
            return;
        }
        yield ctx.reply("✍️ Enter recipient address and amount in this format:\n\n`address amount`", {
            parse_mode: "Markdown"
        });
        const textHandler = (ctx2) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c;
            try {
                if (((_b = ctx2.from) === null || _b === void 0 ? void 0 : _b.id) !== userId)
                    return;
                const [address, amountStr] = ctx2.message.text.split(" ");
                const amount = parseFloat(amountStr);
                if (!address || isNaN(amount) || amount <= 0) {
                    yield ctx2.reply("Invalid format. Use: `address amount`");
                    return;
                }
                const fromWallet = new web3_js_1.PublicKey(wallet.publicKey);
                const toPubKey = new web3_js_1.PublicKey(address);
                const secretKey = bs58_1.default.decode(wallet.privateKey);
                const keyPair = web3_js_1.Keypair.fromSecretKey(secretKey);
                const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                    fromPubkey: fromWallet,
                    toPubkey: toPubKey,
                    lamports: Math.floor(amount * 1000000000),
                }));
                const signature = yield __1.connection.sendTransaction(transaction, [keyPair]);
                console.log("Transaction signature:", signature);
                const latestBlockhash = yield __1.connection.getLatestBlockhash();
                try {
                    yield __1.connection.confirmTransaction({
                        signature,
                        blockhash: latestBlockhash.blockhash,
                        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                    }, "confirmed");
                }
                catch (confirmErr) {
                    console.warn("⚠️ Confirm error, checking status manually:", confirmErr);
                }
                // ✅ Double-check if transaction landed
                const txStatus = yield __1.connection.getSignatureStatus(signature);
                if ((_c = txStatus === null || txStatus === void 0 ? void 0 : txStatus.value) === null || _c === void 0 ? void 0 : _c.confirmationStatus) {
                    yield ctx2.reply(`✅ Sent ${amount} SOL to ${address}\n\nTransaction: \`${signature}\``, { parse_mode: "Markdown" });
                }
                else {
                    yield ctx2.reply(`⚠️ Transaction may still be processing. Check explorer:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
                }
                yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
                    [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
                    [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
                    [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
                    [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
                ]));
            }
            catch (err) {
                console.error("Error sending SOL:", err);
                yield ctx2.reply(" Error sending SOL. Check address and amount.");
                yield ctx2.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
                    [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
                    [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
                    [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
                    [telegraf_1.Markup.button.callback("💳 Wallet", "wallet")],
                ]));
            }
        });
        __2.bot.on("text", textHandler);
    }
    catch (error) {
        console.error("Error in send_sol action:", error);
        yield ctx.reply(" An error occurred. Please try again.");
        yield ctx.reply("Choose an option:", telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("💰 Balance", "balance")],
            [telegraf_1.Markup.button.callback("📤 Send SOL", "send_sol")],
            [telegraf_1.Markup.button.callback("📥 Fund Wallet", "fund_wallet")],
        ]));
    }
}));
