import express, { Router } from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.route';
import { productRoute } from './routes/product.route';
import cors from 'cors'

dotenv.config();

export const app = express();

// Establecer los cors necesarios, aqui admite todas las solicitudes de cualquier lado
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRouter);
app.use('/product', productRoute);



