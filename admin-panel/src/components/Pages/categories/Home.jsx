"use client";

// import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";
import Error from "../../Error";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "./Add";

export default function Listing() {
   const modalRef = useRef(null);
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [deletingId, setDeletingId] = useState(null);

   const fetchCategories = async () => {
      try {
         setLoading(true);
         const response = await axios.get("/api/categories/get");
         setCategories(response.data.categories);
      } catch (error) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   const handleDelete = async (id) => {
      if (!confirm("Are you sure you want to delete this category?")) return;
      setDeletingId(id);
      try {
         await axios.delete(`/api/categories/delete/${id}`);
         setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
         console.error("Error deleting category:", error);
         setError(error.message);
      } finally {
         setDeletingId(null); // Reset the deleting state
      }
   };

   // if (loading) return <span className="loading loading-spinner loading-lg"></span>;
   if (error) return <Error error={error} />;

   return (
      <div className="flex flex-col items-center p-6">
         <div className="flex justify-center items-center mb-6">
            <button
               className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg text-sm font-medium"
               onClick={() => modalRef.current.showModal()}
            >
               Add New category
            </button>
            <dialog
               ref={modalRef}
               id="my_modal_3"
               className="modal bg-gray-900 bg-opacity-70"
               style={{
                  position: "fixed", // Use fixed positioning
                  left: "288px", // Fixed left position
                  top: "50%", // Center vertically
                  transform: "translateY(-50%)", // Center vertically
                  margin: 0,
                  border: "none",
                  overflow: "hidden",
                  width: "auto", // Adjust width if necessary
                  zIndex: 9999, // Ensure it's on top of other content
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
                  <Add
                     modalRef={modalRef}
                     refreshCategories={fetchCategories}
                  />
               </div>
            </dialog>
         </div>
         {loading ? (
            <div className="w-full max-w-4xl">
               <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
                  <thead className="bg-gray-950">
                     <tr>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[15%] border border-gray-700/50">
                           Title
                        </th>
                        <th className="px-6 py-2 text-left text-xl font-medium text-gray-200 w-[45%] border border-gray-700/50">
                           Description
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
                           className="animate-pulse"
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
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="w-full max-w-4xl">
               <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
                  <thead className="bg-gray-950">
                     <tr>
                        <th className="px-4 py-2 text-left text-xl font-medium text-gray-200 w-[32%] border border-gray-700/50">
                           Name
                        </th>
                        <th className="px-4 py-2 text-left text-xl font-medium text-gray-200 w-[50%] border border-gray-700/50">
                           Parent Category
                        </th>
                        <th className="px-4 py-2 text-left text-xl font-medium text-gray-200 w-[18%] border border-gray-700/50">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {categories.map((category) => (
                        <tr
                           key={category._id}
                           className="hover:bg-gray-800 border border-gray-700/50"
                        >
                           <td className="px-3 py-2 text-md text-gray-300 border border-gray-700/50">
                              {category.name}
                           </td>
                           <td className="px-6 py-2 text-lg text-gray-300 border border-gray-700/50">
                              {category.parent}
                           </td>
                           <td className="px-3 py-2 text-lg text-gray-300 flex justify-center items-center space-x-4">
                              <Link
                                 href={`/categories/edit/${category._id}`}
                                 className="flex items-center text-blue-400 border-none hover:text-blue-600 transition-colors duration-200"
                              >
                                 <EditIcon className="mr-2" fontSize="large" />
                              </Link>
                              <button
                                 type="button"
                                 disabled={deletingId === category._id}
                                 onClick={() => handleDelete(category._id)}
                                 className="border-none flex items-center text-red-400 hover:text-red-600 transition-colors duration-200"
                              >
                                 {deletingId === category._id ? (
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
