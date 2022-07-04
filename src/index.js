import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import deleteRouter from "./routes/deleteRouter.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(userRouter);
server.use(deleteRouter)

const PORT = process.env.PORT;

server.listen(PORT, () => console.log("Server is listening on port."));