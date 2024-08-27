"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Error from "../../Error";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "./Add";

export default function Listing() {
   const modalRef = useRef(null);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [deletingId, setDeletingId] = useState(null);

   const fetchProducts = async () => {
      try {
         setLoading(true);
         const response = await axios.get("/api/products/get");
         setProducts(response.data.products);
      } catch (error) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const handleDelete = async (id) => {
      if (!confirm("Are you sure you want to delete this category?")) return;
      setDeletingId(id);
      try {
         await axios.delete(`/api/products/delete/${id}`);
         setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
         console.error("Error deleting product:", error);
         setError(error.message);
      } finally {
         setDeletingId(null);
      }
   };

   if (error) return <Error error={error} />;

   return (
      <div className="flex flex-col items-center p-6">
         <div className="flex justify-center items-center mb-6">
            <button
               className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg text-sm font-medium"
               onClick={() => modalRef.current.showModal()}
            >
               Add New Product
            </button>
            <dialog
               ref={modalRef}
               id="my_modal_3"
               className="modal bg-gray-950 bg-opacity-70"
               style={{
                  position: "fixed",
                  left: "288px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  margin: 0,
                  border: "none",
                  overflow: "hidden",
                  width: "auto",
                  zIndex: 9999,
               }}
            >
               <div
                  className="modal-box bg-gray-900 text-white rounded-lg shadow-lg"
                  style={{
                     padding: "1.5rem",
                     margin: 0,
                     border: "none",
                     overflow: "hidden",
                  }}
               >
                  <form method="dialog" className="ml-72">
                     <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        style={{ border: "none" }}
                     >
                        ✕
                     </button>
                  </form>
                  <Add modalRef={modalRef} refreshCategories={fetchProducts} />
               </div>
            </dialog>
         </div>

         {loading ? (
            <div className="w-full max-w-5xl">
               <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
                  <thead className="bg-gray-950">
                     <tr>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[15%] border border-gray-700/50">
                           Title
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[45%] border border-gray-700/50">
                           Description
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[10%] border border-gray-700/50">
                           Price
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[15%] border border-gray-700/50">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* Skeleton Rows */}
                     {[...Array(4)].map((_, index) => (
                        <tr
                           key={index}
                           className="animate-pulse hover:bg-gray-800"
                        >
                           <td className="px-6 py-2">
                              <div className="skeleton h-6 w-full bg-gray-800 rounded"></div>
                           </td>
                           <td className="px-6 py-2">
                              <div className="skeleton h-6 w-full bg-gray-800 rounded"></div>
                           </td>
                           <td className="px-6 py-2">
                              <div className="skeleton h-6 w-full bg-gray-800 rounded"></div>
                           </td>
                           <td className="px-6 py-2">
                              <div className="skeleton h-6 w-full bg-gray-800 rounded"></div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="w-full max-w-5xl">
               <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
                  <thead className="bg-gray-950">
                     <tr>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[15%] border border-gray-700/50">
                           Title
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[45%] border border-gray-700/50">
                           Description
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[10%] border border-gray-700/50">
                           Price
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[15%] border border-gray-700/50">
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
                              {product.description.substring(0, 75) +
                                 (product.description.length > 75 ? "..." : "")}
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
                                 type="button"
                                 disabled={deletingId === product._id}
                                 onClick={() => handleDelete(product._id)}
                                 className="flex items-center text-red-400 hover:text-red-600 transition-colors duration-200"
                              >
                                 {deletingId === product._id ? (
                                    <span className="loading loading-spinner loading-md mr-4"></span>
                                 ) : (
                                    <DeleteIcon
                                       className="mr-2"
                                       fontSize="large"
                                    />
                                 )}
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}
