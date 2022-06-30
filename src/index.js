import express from "express";
import cors from "cors";
import { signUp } from "./controlles/authController.js";

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", signUp);

server.listen(5000, () => console.log("Server is listening on port 5000."));