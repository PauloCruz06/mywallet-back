import { Router } from "express";
import tokenValidation from "../middlewares/userTokenValidation.js";
import { getTransactions } from "../controlles/userController.js";

const userRouter = Router();

userRouter.use(tokenValidation);
userRouter.get("/transactions", getTransactions);

export default userRouter;