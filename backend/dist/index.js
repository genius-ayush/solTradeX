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
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const web3_js_1 = require("@solana/web3.js");
const mongoose_1 = __importDefault(require("mongoose"));
const bot_1 = require("./bot/bot");
exports.connection = new web3_js_1.Connection(process.env.RPC_URL);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_SECRET, { dbName: "bonkbot" });
            console.log("Connected to DB");
        }
        catch (err) {
            console.error("DB Connection Error:", err);
        }
    });
}
app.get("/", (req, res) => {
    res.send("bot is running on /webhook");
});
app.post("/webhook", (req, res) => {
    console.log(req.body);
    bot_1.bot.handleUpdate(req.body);
    res.status(200).send("OK");
});
// Set webhook for production
// if (process.env.NODE_ENV === "production") {
//   const webhookUrl = `${process.env.VERCEL_URL}/webhook`;
//   bot.telegram.setWebhook(webhookUrl);
//   console.log(`Webhook set to: ${webhookUrl}`);
// }
// async function bootstrap() {
//   await connectDB();
//   if (process.env.NODE_ENV === "production") {
//     // For production, start Express server
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } else {
//     // For development, use polling
//     await bot.launch();
//     console.log('Bot is running in development mode');
//   }
// }
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        yield bot_1.bot.launch();
    });
}
bootstrap();
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});
