import dotenv from "dotenv";
import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";

dotenv.config();

export const wallets: Record<number , Keypair> = {} ; 
export const connection = new Connection(process.env.RPC_URL!) 
import { bot } from "./bot/bot";



import  './bot/handlers/start' ; 
import './bot/handlers/help' ; 
import './bot/handlers/send' ; 
import './bot/handlers/balance' ;
import './bot/handlers/fund' ; 
import './bot/handlers/wallet' ; 
import './bot/handlers/back' ;
import './bot/handlers/secretKey' ; 

 async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" });
    console.log(" Connected to DB");
  } catch (err) {
    console.error(" DB Connection Error:", err);
  }
}

async function bootstrap(){
  await connectDB(); 
  await bot.launch() ; 
  console.log('bot is running') ; 
}

bootstrap() ; 


