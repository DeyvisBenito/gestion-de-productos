import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import { generarToken } from "../services/auth.service";
import { UserModel } from "../models/modelsSequalize/user.model";
import { User } from "../models/interfaces/user.interface";


// Registro de usuario
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || email === null || !password || password === null) {
            res.status(400).json({ message: `Email y password son requeridos` });
            return;
        }

        const userExist = await searchUser(email);
        if (userExist) {
            res.status(400).json({ message: 'El usuario ya existe' })
            return;
        }

        const passwordHashed = await hashPassword(password);

        const userRegistered = await UserModel.create({
            Email: email,
            Password: passwordHashed
        });

        const user: User = userRegistered.toJSON();

        const token = generarToken(user);

        res.status(201).json({ token });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        } else {
            res.status(500).json({ message: String(error) });
            return;
        }
    }
}

// Login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as { email: string, password: string };

        if (!email || email === null || !password || password == null) {
            res.status(400).json({ message: "Email y password son requeridos" });
            return;
        }

        const user = await searchUser(email);
        if (!user) {
            res.status(400).json({ message: 'Usuario y contraseña no coinciden' });
            return;
        }

        const authorize = await comparePasswords(password, user.Password);
        if (!authorize) {
            res.status(400).json({ message: 'Usuario y contraseña no coinciden' });
            return;
        }

        const token = generarToken(user);

        res.status(200).json({token});


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        } else {
            res.status(500).json({ message: String(error) });
            return;
        }
    }
}


// Buscar usuario
const searchUser = async (email: string): Promise<User | null> => {
    try {
        const userBD = await UserModel.findOne({ where: { Email: email } });
        const user: User | undefined = userBD?.toJSON();
        return user || null;

    } catch (error) {
        throw error;
    }
}