import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Connection, Keypair } from "@solana/web3.js";
import mongoose from "mongoose";
import { bot } from "./bot/bot";

export const connection = new Connection(process.env.RPC_URL!)

const app = express();
const PORT = process.env.PORT || 3000;

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


app.get("/", (req, res) => {
  res.send("bot is running on /webhook") ; 
});


app.post("/webhook", (req, res) => {
  console.log(req.body) ; 
  bot.handleUpdate(req.body);
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



async function bootstrap(){
  await connectDB() ; 
  // await bot.launch() ; 
}

bootstrap();


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})