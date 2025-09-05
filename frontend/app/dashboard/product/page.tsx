"use client";

import { useRouter } from "next/navigation";

import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/invoices/table";
import { CreateProduct } from "@/app/ui/invoices/buttons";
import { useValidateToken } from "@/app/lib/useValidateToken";
import { getProducts } from "@/app/lib/api";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Product, ProductsPaginated } from "@/app/lib/definitions";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProductsPage() {
  const router = useRouter();
  useValidateToken();

  // States for total and current page
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // Products per page
  const sizeProducts: number = 5;

  const [respProduct, setRespProduct] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProducts = async () => {
      try {
        const data = await getProducts(token, page, sizeProducts);
        if (data === 403) {
          toast.error("No tienes acceso a este recurso", {
            description: "Por favor, inicie sesion",
          });
          await sleep(2000);
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }
        const products: ProductsPaginated = data as ProductsPaginated;
        setRespProduct(products.Products);
        setTotal(products.Total);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, [router, page]);

  const totalPages = Math.ceil(total / sizeProducts);

  return (
    <div className="w-full">
      <Toaster position="top-center" richColors />
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Productos</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 md:mt-8 text-end justify-end">
        <CreateProduct />
      </div>
      <div>
        <Table
          products={respProduct}
          onDeleted={(deletedId) => {
            setRespProduct((prev: Product[]) =>
              prev.filter((p) => p.Id !== deletedId)
            );
          }}
        />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
