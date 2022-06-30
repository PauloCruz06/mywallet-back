import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signIn, signUp } from "./controlles/authController.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", signUp);
server.post("/sign-in", signIn);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log("Server is listening on port."));