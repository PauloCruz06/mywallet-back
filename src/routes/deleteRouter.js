import { Router } from "express";
import tokenValidation from "../middlewares/userTokenValidation.js";
import { deleteTransactions } from "../controlles/deleteController.js";

const deleteRouter = Router();

deleteRouter.delete("/transactions/:id", tokenValidation, deleteTransactions);

export default deleteRouter;