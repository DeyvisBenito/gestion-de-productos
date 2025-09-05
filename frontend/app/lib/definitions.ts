export type User = {
  Id: number;
  Email: string;
  Password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type Product = {
  Id: number;
  Name: string;
  Price: number;
  Amount: number;
  Description: string;
  message?: string;
};

export type ProductPost = {
  name: string;
  price: number;
  amount: number;
  description: string;
};

export type Token = {
  token: string;
  error?: string;
}

export type ProductsPaginated = {
  Products: Product[];
  Total: number;
}

