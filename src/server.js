import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js'

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);

server.listen(5000);