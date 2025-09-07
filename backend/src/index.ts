import express, { Request, Response } from 'express' ; 

import dotenv from "dotenv";
import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot/bot";

dotenv.config();

export const wallets: Record<number , Keypair> = {} ; 
export const connection = new Connection(process.env.RPC_URL!) 

const app = express(); 

app.use(express.json());



// import  './bot/handlers/start' ; 
// import './bot/handlers/help' ; 
// import './bot/handlers/send' ; 
// import './bot/handlers/balance' ;
// import './bot/handlers/fund' ; 
// import './bot/handlers/wallet' ; 
// import './bot/handlers/back' ;
// import './bot/handlers/secretKey' ;





 async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" });
    console.log(" Connected to DB");
  } catch (err) {
    console.error(" DB Connection Error:", err);
  }
}

// async function bootstrap(){
//   await connectDB(); 
//   await bot.launch() ; 
//   console.log('bot is running') ; 
// }

// bootstrap() ; 


export default async function handler(req : Request, res : Response) {
  await connectDB();

  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
    } catch (err) {
      console.error("Error handling update", err);
      res.status(500).send("Error");
    }
    return;
  }

  res.status(200).send("BonkBot is live on Vercel 🚀");
}

