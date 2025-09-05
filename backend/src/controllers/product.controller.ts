import { Request, Response } from "express";
import { ProductModel } from '../models/modelsSequalize/product.model'
import { Product } from "../models/interfaces/product.interface";
import { OptionPagination } from "../models/interfaces/optionsPagination.interface";
import { ProductPaginated } from "../models/interfaces/productPaginated.interface";

// Get all products and paginated
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, size } = req.query;

        if (!page || !size) {
            const productsBD = await ProductModel.findAll();

            const products: Product[] = productsBD.map(product => product.toJSON() as Product);

            res.status(200).json(products);
            return;
        }

        const options: OptionPagination = {
            limit: Number(size),
            offset: (Number(page) - 1) * Number(size)
        }

        const { count, rows } = await ProductModel.findAndCountAll(options);

        const productsPaginated: ProductPaginated = {
            Products: rows.map(product => product.toJSON() as Product),
            Total: count
        }

        res.status(200).json(productsPaginated)


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: String(error) });
            return;
        }
    }
}

// Get one Product
export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const productId = req.params.id;
        if (!productId || productId === null) {
            res.status(400).json({ error: 'El Id es requerido' })
            return;
        }

        const Id = parseInt(productId);
        if (isNaN(Id)) {
            res.status(400).json({ error: 'Id no valido' });
            return;
        }

        const product = await getProductExistWithId(Id);

        if (!product || product === null) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        res.status(200).json(product);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: String(error) });
            return;
        }
    }
}

// Post product (diferent name) it don't admit if there are one with the same name
export const postProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, price, amount, description } =
            req.body as { name: string, price: number | undefined, amount: number | undefined, description: string };

        if (!name || name === null || !price || price === null || !amount || amount === null || !description || description === null) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        const productExist = await getProductExistWithName(name);
        if (productExist) {
            res.status(400).json({ error: 'Ya existe un producto con este nombre' });
            return;
        }

        const newProduct = await ProductModel.create({
            Name: name,
            Price: price,
            Amount: amount,
            Description: description
        });

        res.status(201).json({ message: 'Producto creado correctamente' });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: String(error) });
            return;
        }
    }
}

// Put product with Id
export const putProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id;
        if (!productId || productId === null) {
            res.status(400).json({ error: 'El Id es requerido' });
            return;
        }
        const Id = parseInt(productId);
        if (isNaN(Id)) {
            res.status(400).json({ error: 'Id invalido' });
            return;
        }

        const { name, price, amount, description } =
            req.body as { name: string, price: number | undefined, amount: number | undefined, description: string }

        if (!name || name === null || !price || price === null || !amount || amount === null || !description || description === null) {
            res.status(400).json({ error: 'Todos los campos son requeridos' });
            return;
        }

        const productDB = await getProductExistWithId(Id);
        if (!productDB || productDB === null) {
            res.status(404).json({ error: 'El producto a actualizar no existe' });
            return;
        }

        if (productDB.Name !== name) {
            const productBDWithName = await getProductExistWithName(name);
            if (productBDWithName) {
                res.status(400).json({ error: 'Ya existe un producto con este nombre' });
                return;
            }
        }


        await ProductModel.update({
            Name: name,
            Price: price,
            Amount: amount,
            Description: description
        }, {
            where: { Id }
        })

        res.status(200).json({ message: 'Producto actualizado correctamente' });


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: String(error) });
            return;
        }
    }
}

// Delete product with Id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const productId = req.params.id;
        if (!productId || productId === null) {
            res.status(400).json({ error: 'El Id es requerido' });
            return;
        }

        const Id = parseInt(productId);
        if (isNaN(Id)) {
            res.status(400).json({ error: 'Id invalido' });
            return;
        }

        const product = await getProductExistWithId(Id);
        if (!product || product === null) {
            res.status(404).json({ error: 'Producto a eliminar no existe' });
            return;
        }

        await ProductModel.destroy({ where: { Id } });

        res.status(200).json({ message: 'Producto eliminado correctamente' });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: String(error) });
            return;
        }
    }
}

// Get product if it exist for Id
const getProductExistWithId = async (id: number): Promise<Product | null> => {
    try {
        const productDB = await ProductModel.findOne({ where: { Id: id } });
        const product: Product | undefined = productDB?.toJSON();

        return product || null;

    } catch (error) {
        throw error;
    }
}

// Get product if it exist for Name
const getProductExistWithName = async (name: string): Promise<Product | null> => {
    try {
        const productDB = await ProductModel.findOne({ where: { Name: name } });
        const product: Product | undefined = productDB?.toJSON();

        return product || null;

    } catch (error) {
        throw error;
    }
}