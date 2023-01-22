import { Router } from "express";
import { userWallet } from "../controllers/user.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.get("/home", userWallet);

export default userRouter;