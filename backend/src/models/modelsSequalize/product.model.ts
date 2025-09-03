import { DataTypes } from "sequelize";
import { sequelize } from '../../Data/database'

export const ProductModel = sequelize.define('product', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    Price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Amount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Description:{
        type: DataTypes.STRING(1500),
        allowNull: false
    }
}, {
    tableName: "products",
    timestamps: false
})