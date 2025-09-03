import bycript from 'bcrypt';

// Numero de saltos de incriptado
const SALT_ROUNDS: number = 10;

// Metodo de encriptado
export const hashPassword = async (password: string): Promise<string> => {
    return await bycript.hash(password, SALT_ROUNDS);
}

// Metodo para comparar password hasheadas
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bycript.compare(password, hash);
} 