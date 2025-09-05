import { Product, User, UserLogin, Token, ProductPost, ProductsPaginated } from './definitions'

// Change URL_BASE instead your Backend URL_BASE
const URL_BASE: string = process.env.NEXT_PUBLIC_URL_BASE || 'http://localhost:3000';

// Fetch of register
export async function registerUser(credentials: UserLogin): Promise<Token> {
    const result = await fetch(`${URL_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data: Token = await result.json();

    if (!result.ok) {
        throw new Error(data.error || "Error al registrarse");
    }

    return data;
}

// Fetch of login
export async function loginUser(credentials: UserLogin): Promise<Token> {
    const result = await fetch(`${URL_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data: Token = await result.json();

    if (!result.ok) {
        throw new Error(data.error || "Error al loguearse");
    }

    return data;
}


// Fetch validate Token
export async function validateToken(token: string): Promise<boolean> {
    const result = await fetch(`${URL_BASE}/auth/validateToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if (!result.ok) {
        return false;
    }

    return true;
}

// Fetch get products
export const getProducts = async (token: string | null, page: number, size: number): Promise<ProductsPaginated | number> => {

    const resp = await fetch(`${URL_BASE}/product?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const data: ProductsPaginated = await resp.json();

    if (resp.status === 403) {
        return 403;
    }
    if (!resp.ok) {
        throw new Error("Error al cargar productos");
    }

    return data;
}

// Fetch get product with Id
export const getProductWithId = async (token: string | null, id: string): Promise<Product | number> => {

    const resp = await fetch(`${URL_BASE}/product/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const data: Product = await resp.json();
    if (resp.status === 403) {
        return 403;
    }
    if (!resp.ok) {
        throw new Error(data.message || "Error al obtener el producto");
    }

    return data;
}

// Do a Post of product
export const postPorduct = async (token: string | null, product: ProductPost): Promise<void | number> => {
    const resp = await fetch(`${URL_BASE}/product/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    const data = await resp.json();

    if (resp.status === 403) {
        return 403;
    }
    if (!resp.ok) {
        throw new Error(data.error || "Error al agregar el producto");
    }

    return data;
}


// Do a Update of product
export const updatePorduct = async (token: string | null, product: ProductPost, id: string): Promise<{ message: string } | number> => {
    const resp = await fetch(`${URL_BASE}/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    const data = await resp.json();

    if (resp.status === 403) {
        return 403;
    }
    if (!resp.ok) {
        throw new Error(data.error || "Error al actualizar el producto");
    }

    return data;
}



// Do a delete with Id
export const deleteProduct = async (token: string | null, id: number): Promise<void | number> => {
    const resp = await fetch(`${URL_BASE}/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resp.json();

    if (resp.status === 403) {
        return 403;
    }
    if (!resp.ok) {
        throw new Error(data.error || "Error al eliminar el producto");
    }

    return data;
}