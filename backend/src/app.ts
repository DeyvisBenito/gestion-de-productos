import express, { Router } from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.route';
import { productRoute } from './routes/product.route';

dotenv.config();

export const app = express();

app.use(express.json());

// Rutas
app.use('/auth', authRouter);
app.use('/product', productRoute);



