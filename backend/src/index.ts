import dotenv from "dotenv";
dotenv.config();

import { Connection } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot";

export const connection = new Connection(process.env.RPC_URL!);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" });
    console.log("Connected to DB");
  }
}
connectDB();

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).send("bot is running on /webhook");
  }

  if (req.method === "POST" && req.url.endsWith("/webhook")) {
    console.log("Incoming Telegram update:", req.body);
    await bot.handleUpdate(req.body);
    return res.status(200).send("OK");
  }

  return res.status(404).send("Not Found");
}