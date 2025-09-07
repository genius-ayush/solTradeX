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
const web3_js_1 = require("@solana/web3.js");
const mongoose_1 = __importDefault(require("mongoose"));
const bot_1 = require("./bot");
exports.connection = new web3_js_1.Connection(process.env.RPC_URL);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.default.connection.readyState === 0) {
            yield mongoose_1.default.connect(process.env.MONGO_SECRET, { dbName: "bonkbot" });
            console.log("Connected to DB");
        }
    });
}
connectDB();
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "GET") {
            return res.status(200).send("bot is running on /webhook");
        }
        if (req.method === "POST" && req.url.endsWith("/webhook")) {
            console.log("Incoming Telegram update:", req.body);
            yield bot_1.bot.handleUpdate(req.body);
            return res.status(200).send("OK");
        }
        return res.status(404).send("Not Found");
    });
}
exports.default = handler;
