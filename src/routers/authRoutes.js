import { Router } from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validationSchemaMiddleware } from '../middlewares/validationSchemaMiddleware.js';
import { CreateUserJoi } from '../schemas/validation/CreateUser.js';
import { AuthUserJoi } from '../schemas/validation/AuthUser.js';

const authRouter = Router();
authRouter.post("/sign-up", validationSchemaMiddleware(CreateUserJoi), authController.signUp);
authRouter.post("/sign-in", validationSchemaMiddleware(AuthUserJoi), authController.signIn);
authRouter.get("/me", authMiddleware, authController.userLogged);

export default authRouter;