import { User } from "../models/interfaces/user.interface";
import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config();

const JWT_SECRET = process.env.JWT_SECRET || 'llaveDefault';


// Servicio para generacion de token
export const generarToken = (user: User): string => {
    return jwt.sign({ id:user.Id, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
}