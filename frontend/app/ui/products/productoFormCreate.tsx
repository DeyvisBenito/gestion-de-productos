"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ProductPost } from "@/app/lib/definitions";

import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useValidateToken } from "@/app/lib/useValidateToken";
import { postPorduct } from "@/app/lib/api";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProductFormCreate() {
  useValidateToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem("token");
    const postProduct: ProductPost = {
      name: data.name,
      price: data.price,
      amount: data.amount,
      description: data.description,
    };

    try {
      const data = await postPorduct(token, postProduct);

      if (data === 403) {
        toast.error("No tienes autorizacion", {
          description: "Inicia sesion, por favor",
        });

        await sleep(2000);
        localStorage.removeItem("token");
        router.push("/auth/login");
        return;
      }

      toast.success("Producto creado correctamente", {
        description: "Volviendo al dashboard...",
      });

      const button = document.getElementById(
        "submitButton"
      ) as HTMLButtonElement;
      button.disabled = true;

      await sleep(2000);
      button.disabled = false;
      router.push("/dashboard/product");
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <label htmlFor="name" className="font-medium">
          Name:
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
          type="text"
          id="name"
          {...register("name", {
            required: {
              value: true,
              message: "Name es requerido",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">
            {errors.name.message as string}
          </span>
        )}

        <label htmlFor="price" className="font-medium mt-4">
          Price:
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
          type="number"
          step="0.01"
          id="price"
          placeholder="1.00"
          {...register("price", {
            required: {
              value: true,
              message: "Price es requerido",
            },
          })}
        />
        {errors.price && (
          <span className="text-red-500 text-sm">
            {errors.price.message as string}
          </span>
        )}

        <label htmlFor="amount" className="font-medium mt-4">
          Amount:
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
          type="number"
          step="1"
          id="amount"
          placeholder="1"
          {...register("amount", {
            required: {
              value: true,
              message: "Amount es requerido",
            },
          })}
        />
        {errors.amount && (
          <span className="text-red-500 text-sm">
            {errors.amount.message as string}
          </span>
        )}

        <label htmlFor="description" className="font-medium mt-4">
          Descripcion:
        </label>
        <textarea
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
          id="description"
          {...register("description", {
            required: {
              value: true,
              message: "Description es requerido",
            },
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message as string}
          </span>
        )}

        <button
          id="submitButton"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-colors"
        >
          Crear
        </button>

        <Link
          href="/dashboard/product"
          className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg shadow-md transition-colors inline-block"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
