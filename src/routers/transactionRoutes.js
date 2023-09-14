import { Router } from 'express';
import transactionController from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validationSchemaMiddleware } from '../middlewares/validationSchemaMiddleware.js';
import { CreateTransactionJoi } from '../schemas/validation/CreateTransaction.js';

const transactionRouter = Router();
transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions", validationSchemaMiddleware(CreateTransactionJoi),transactionController.create);
transactionRouter.get("/transactions", transactionController.findByUser);
transactionRouter.patch("/transactions/:id", validationSchemaMiddleware(CreateTransactionJoi), transactionController.updateById);
transactionRouter.delete("/transactions/:id", transactionController.deleteById);

export default transactionRouter;