import dotenv from "dotenv";
dotenv.config();

import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot/bot";
export const connection = new Connection(process.env.RPC_URL!)

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" }); console.log(" Connected to DB");
  }
  catch (err) {
    console.error(" DB Connection Error:", err);

  }
}

async function bootstrap() {
  await connectDB();
  await bot.launch();
  console.log('bot is running');
}
bootstrap();