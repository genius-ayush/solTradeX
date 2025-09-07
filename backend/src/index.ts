import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";
// import { bot } from "../../bot/bot"; // adjust path depending on your structure
import { Request, Response } from "express";
import { bot } from "./bot/bot";

export const wallets: Record<number, Keypair> = {};
export const connection = new Connection(process.env.RPC_URL!);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" });
    isConnected = true;
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

// Vercel handler function
export default async function handler(req:Request, res: Response) {
  await connectDB();

  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
    } catch (err) {
      console.error("Error handling update", err);
      return res.status(500).send("Error");
    }
    return;
  }

  return res.status(200).send("BonkBot is live on Vercel 🚀");
}
