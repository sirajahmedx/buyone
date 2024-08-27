"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "../ModalForm";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import LoadingSpinner from "../LoadingSpinner"; // Import your loading spinner component

export default function Categories() {
   const modalRef = useRef(null);
   const [categories, setCategories] = useState([]);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);
   const [deletingId, setDeletingId] = useState(null);

   const fetchCategories = async () => {
      try {
         setLoading(true);
         const response = await axios.get("/api/categories/get");
         setCategories(response.data.categories);
         setError("");
      } catch (error) {
         setError("Error fetching categories. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   const handleDelete = async (id) => {
      setDeletingId(id); // Set the ID of the category being deleted
      try {
         await axios.delete(`/api/categories/delete/${id}`);
         setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
         console.error("Error deleting category:", error);
         setError("Error deleting category. Please try again later.");
      } finally {
         setDeletingId(null); // Reset the deleting state
      }
   };

   return (
      <div className="flex flex-col items-center p-6">
         {/* Modal Parent Container */}
         <div className="flex justify-center items-center mb-6">
            <button
               className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg text-sm font-medium"
               onClick={() => modalRef.current.showModal()}
            >
               Add Category
            </button>
            <dialog
               ref={modalRef}
               id="my_modal_3"
               className="modal bg-gray-900 bg-opacity-70"
               style={{
                  padding: 0,
                  margin: 0,
                  border: "none",
                  overflow: "hidden",
               }}
            >
               <div
                  className="modal-box bg-gray-900 text-white rounded-lg shadow-lg"
                  style={{
                     position: "relative",
                     padding: "1.5rem",
                     margin: 0,
                     border: "none",
                     overflow: "hidden",
                  }}
               >
                  <form method="dialog">
                     <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        style={{ border: "none" }}
                     >
                        ✕
                     </button>
                  </form>
                  <Modal
                     modalRef={modalRef}
                     refreshCategories={fetchCategories}
                  />
               </div>
            </dialog>
         </div>

         {/* Categories Listing Container */}
         <div className="w-full max-w-5xl">
            {loading ? (
               <div className="flex justify-center items-center h-full">
                  <span className="loading loading-spinner loading-md"></span>{" "}
                  {/* Replace with your spinner component */}
               </div>
            ) : (
               <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700/50">
                  <thead className="bg-gray-950">
                     <tr>
                        <th className="px-6 py-3 text-left text-xl font-medium text-gray-200 border border-gray-700/50">
                           Name
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-gray-200 border border-gray-700/50">
                           Parent
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-gray-200 border border-gray-700/50">
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
                           <td className="px-6 py-4 text-md text-gray-300 border border-gray-700/50">
                              {category.name}
                           </td>
                           <td className="px-6 py-4 text-md text-gray-300 border border-gray-700/50">
                              {category.parent}
                           </td>
                           <td className="px-6 py-4 text-md text-gray-300 flex items-center justify-center space-x-4 border border-gray-700/50">
                              <button
                                 type="button"
                                 className="flex items-center text-blue-400 hover:text-blue-600 transition-colors duration-200"
                                 onClick={() =>
                                    console.log(`Edit category ${category._id}`)
                                 }
                              >
                                 <EditIcon className="mr-2" fontSize="large" />
                              </button>
                              <button
                                 type="button"
                                 disabled={deletingId === category._id}
                                 onClick={() => handleDelete(category._id)}
                                 className="flex items-center text-red-400 hover:text-red-600 transition-colors duration-200"
                              >
                                 {deletingId === category._id ? (
                                    <span className="loading loading-spinner loading-xs"></span>
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
            )}
         </div>
      </div>
   );
}
