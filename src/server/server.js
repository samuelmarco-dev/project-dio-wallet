import express, { json } from 'express';
import cors from 'cors';
import { connectDB } from '../config/database.js';
import authRouter from '../routers/authRoutes.js';
import transactionRouter from '../routers/transactionRoutes.js';

const app = express();
connectDB();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(transactionRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));