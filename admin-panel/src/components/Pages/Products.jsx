"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductsComponent() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get("/api/products/get");
            setProducts(response.data.products);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
   }, []);

   const handleDelete = async (id) => {
      try {
         await axios.delete(`/api/products/delete/${id}`);
         setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
         console.error("Error deleting product:", error);
         setError(error.message);
      }
   };

   if (loading) return <Loading />;
   if (error) return <Error error={error} />;

   return (
      <div className="flex flex-col items-center p-6">
         <Link href="/products/add" className="mb-6">
            <button className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg text-sm font-medium">
               Add New Product
            </button>
         </Link>

         <div className="w-full max-w-5xl">
            <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
               <thead className="bg-gray-950">
                  <tr>
                     <th className="px-6 py-2 text-left text-lg font-medium text-gray-300 w-[15%] border border-gray-700/50">
                        Title
                     </th>
                     <th className="px-6 py-2 text-left text-lg font-medium text-gray-300 w-[45%] border border-gray-700/50">
                        Description
                     </th>
                     <th className="px-6 py-2 text-left text-lg font-medium text-gray-300 w-[10%] border border-gray-700/50">
                        Price
                     </th>
                     <th className="px-6 py-2 text-left text-lg font-medium text-gray-300 w-[15%] border border-gray-700/50">
                        Actions
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product) => (
                     <tr
                        key={product._id}
                        className="hover:bg-gray-800 border border-gray-700/50"
                     >
                        <td className="px-6 py-2 text-md text-gray-300 border border-gray-700/50">
                           {product.title}
                        </td>
                        <td className="px-6 py-2 text-md text-gray-300 border border-gray-700/50">
                           {product.description
                              .split(" ")
                              .slice(0, 15)
                              .join(" ")}
                           {product.description.split(" ").length > 15
                              ? "..."
                              : ""}
                        </td>
                        <td className="px-6 py-2 text-md text-gray-300 border border-gray-700/50">
                           ${product.price}
                        </td>
                        <td className="px-6 py-2 text-md text-gray-300 flex items-center justify-center space-x-4 border border-gray-700/50">
                           <Link
                              href={`/products/edit/${product._id}`}
                              className="flex items-center text-blue-400 hover:text-blue-600 transition-colors duration-200"
                           >
                              <EditIcon className="mr-2" fontSize="large" />
                           </Link>
                           <button
                              onClick={() => handleDelete(product._id)}
                              className="flex items-center text-red-400 hover:text-red-600 transition-colors duration-200"
                           >
                              <DeleteIcon className="mr-2" fontSize="large" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
