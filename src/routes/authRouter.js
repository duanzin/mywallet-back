import { Router } from "express";
import { cadastroController, loginController } from "../controllers/auth.js";
import { cadastroSchema, loginSchema } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/cadastro", validateSchema(cadastroSchema), cadastroController);
authRouter.post("/login", validateSchema(loginSchema), loginController);

export default authRouter;
