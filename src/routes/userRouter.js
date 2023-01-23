import { Router } from "express";
import { userWallet, updateWallet } from "../controllers/user.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { userSchema } from "../schemas/authSchema.js";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.get("/home", userWallet);
userRouter.post("/registro", validateSchema(userSchema), updateWallet);

export default userRouter;