"use client";

import { useParams, useRouter } from "next/navigation";

import { Product, ProductPost } from "@/app/lib/definitions";
import { useValidateToken } from "@/app/lib/useValidateToken";
import { updatePorduct } from "@/app/lib/api";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProductFillData({
  product,
  editable,
}: {
  product: Product;
  editable: boolean;
}) {
  useValidateToken();

  const params = useParams();
  // Agarra el primer elemento si es que viene un array en el param
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) {
    toast.error("Producto no seleccionado");
    setTimeout(() => {
      router.push("/dashboard/product");
    }, 2000);

    return;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = localStorage.getItem("token");

      const productActu: ProductPost = {
        name: data.name,
        price: data.price,
        amount: data.amount,
        description: data.description,
      };

      const resp = await updatePorduct(token, productActu, id);

      if (resp === 403) {
        toast.error("No tienes acceso a este recurso", {
          description: "Por favor, inicia sesión",
        });
        await sleep(2000);
        router.push("/auth/login");
      } else if (typeof resp === "object" && "message" in resp) {
        toast.success(resp.message, {
          description: "Volviendo al dashboard...",
        });

        const button = document.getElementById(
          "submitButton"
        ) as HTMLButtonElement;
        button.disabled = true;

        await sleep(2000);
        button.disabled = false;
        router.push("/dashboard/product");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      {product && (
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            type="text"
            id="name"
            defaultValue={product.Name}
            readOnly={!editable}
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
            Price
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            type="number"
            id="price"
            step="0.01"
            defaultValue={product.Price}
            readOnly={!editable}
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
            Amount
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            type="number"
            id="amount"
            step="1"
            defaultValue={product.Amount}
            readOnly={!editable}
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
            Descripcion
          </label>
          <textarea
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            id="description"
            defaultValue={product.Description}
            readOnly={!editable}
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

          {editable && (
            <button
              id="submitButton"
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-colors"
            >
              Actualizar
            </button>
          )}
        </div>
      )}
    </form>
  );
}
