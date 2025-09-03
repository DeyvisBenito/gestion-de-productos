import express from 'express'
import { register, login } from '../controllers/auth.controller';

export const authRouter = express.Router();

// Route for Register
authRouter.post('/register', register);


// Route for Login
authRouter.post('/login', login);