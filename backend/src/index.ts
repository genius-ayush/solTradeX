import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Connection } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot";

export const connection = new Connection(process.env.RPC_URL!);

const app = express();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_SECRET!, { dbName: "bonkbot" });
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

app.get("/", (req, res) => {
  res.send("bot is running on /webhook");
});

app.post("/webhook", (req, res) => {
  console.log(req.body);
  const work = bot.handleUpdate(req.body);
  console.log(work) ; 
  res.status(200).send("OK");
});

async function bootstrap() {
  await connectDB();
}
bootstrap();

// ✅ Vercel needs a handler function
const handler = (req: any, res: any) => {
  app(req, res); // delegate to express
};

export default handler;
