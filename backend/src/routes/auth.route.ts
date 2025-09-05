import express from 'express'
import { register, login, authenticateTokens } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

export const authRouter = express.Router();

// Route for Register
authRouter.post('/register', register);


// Route for Login
authRouter.post('/login', login);

// Route for validate token
authRouter.post('/validateToken', authenticateToken, authenticateTokens)