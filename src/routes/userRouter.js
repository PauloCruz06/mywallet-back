import { Router } from "express";
import tokenValidation from "../middlewares/userTokenValidation.js";
import { getTransactions, setTransactions } from "../controlles/userController.js";

const userRouter = Router();

userRouter.use(tokenValidation);
userRouter.get("/transactions", getTransactions);
userRouter.post("/transactions", setTransactions);

export default userRouter;