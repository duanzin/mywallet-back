import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("MongoDB Connected!");
} catch (error) {
  console.log(error.message);
}

const server = express();
server.use(cors());
server.use(express.json());



server.listen(5000);