import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot/bot";

export const connection = new Connection(process.env.RPC_URL!);

const app = express();

// Middleware
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" }); 
    console.log("Connected to DB");
  }
  catch (err) {
    console.error("DB Connection Error:", err);
  }
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Bot is running", timestamp: new Date().toISOString() });
});

// Webhook endpoint for Telegram
app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body);
  res.status(200).send("OK");
});

// Set webhook for production (Vercel)
if (process.env.NODE_ENV === "production") {
  const webhookUrl = `${process.env.VERCEL_URL}/webhook`;
  bot.telegram.setWebhook(webhookUrl);
  console.log(`Webhook set to: ${webhookUrl}`);
}

connectDB();

// ❌ Don’t call app.listen()
// ✅ Just export for Vercel
export default app;
