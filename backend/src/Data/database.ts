import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const NAMEBD = process.env.NAMEBD || '';
const USERDB = process.env.USERDB || '';
const PASSWORDDB = process.env.PASSWORDDB || '';
const HOST = process.env.HOST || '';
const PORTDB = Number(process.env.PORTDB) || 3336;

export const sequelize = new Sequelize(NAMEBD, USERDB, PASSWORDDB, {
    host: HOST,
    dialect: "mysql",
    port: PORTDB,
    logging: false, 
});