import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken';
import { getProducts, getProduct, postProduct, putProduct, deleteProduct } from '../controllers/product.controller';

export const productRoute = express.Router();

// List products
productRoute.get('/', authenticateToken, getProducts);

// Get one product
productRoute.get('/:id', authenticateToken, getProduct);

// Create products
productRoute.post('/', authenticateToken, postProduct);

// Update product
productRoute.put('/:id', authenticateToken, putProduct)

// Delete product
productRoute.delete('/:id', authenticateToken, deleteProduct)