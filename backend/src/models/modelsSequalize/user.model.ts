import { DataTypes } from "sequelize";
import { sequelize } from '../../Data/database'

export const UserModel = sequelize.define('user', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    Password:{
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: "users",
    timestamps: false
})