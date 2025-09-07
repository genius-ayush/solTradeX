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
exports.connection = exports.wallets = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const web3_js_1 = require("@solana/web3.js");
const mongoose_1 = __importDefault(require("mongoose"));
const bot_1 = require("./bot/bot");
dotenv_1.default.config();
exports.wallets = {};
exports.connection = new web3_js_1.Connection(process.env.RPC_URL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
// import  './bot/handlers/start' ; 
// import './bot/handlers/help' ; 
// import './bot/handlers/send' ; 
// import './bot/handlers/balance' ;
// import './bot/handlers/fund' ; 
// import './bot/handlers/wallet' ; 
// import './bot/handlers/back' ;
// import './bot/handlers/secretKey' ;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_SECRET, { dbName: "bonkbot" });
            console.log(" Connected to DB");
        }
        catch (err) {
            console.error(" DB Connection Error:", err);
        }
    });
}
// async function bootstrap(){
//   await connectDB(); 
//   await bot.launch() ; 
//   console.log('bot is running') ; 
// }
// bootstrap() ; 
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        if (req.method === "POST") {
            try {
                yield bot_1.bot.handleUpdate(req.body, res);
            }
            catch (err) {
                console.error("Error handling update", err);
                res.status(500).send("Error");
            }
            return;
        }
        res.status(200).send("BonkBot is live on Vercel 🚀");
    });
}
exports.default = handler;
