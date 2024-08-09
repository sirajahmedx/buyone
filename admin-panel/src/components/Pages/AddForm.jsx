"use client";
import React, { useState } from "react";
import axios from "axios";
import Success from "../Success";

export default function AddForm() {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess("");

      try {
         await axios.post("/api/products/add", {
            title,
            description,
            price,
         });
         setSuccess("Product added successfully"); // Fixed typo in success message

         setTitle("");
         setDescription("");
         setPrice("");
      } catch (error) {
         setError("An error occurred while adding the product");
         console.error("Error adding product:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 shadow-lg rounded-lg bg-gray-800"
         >
            <h2 className="text-3xl font-semibold text-gray-100 mb-6">
               Submit Details
            </h2>

            <div className="mb-5">
               <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
               >
                  Title
               </label>
               <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                  placeholder="Enter title"
                  required
               />
            </div>

            <div className="mb-5">
               <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
               >
                  Description
               </label>
               <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                  placeholder="Enter description"
                  rows="4"
                  required
               />
            </div>

            <div className="mb-5">
               <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-300 mb-1"
               >
                  Price
               </label>
               <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                  placeholder="Enter price"
                  required
               />
            </div>

            {success && ( // Correctly handle success message
               <div className="mb-5 flex items-center text-green-400">
                  <Success msg={success} />
               </div>
            )}

            {error && ( // Display error if any
               <div className="mb-5 text-red-400">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6 inline-block mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
                  {error}
               </div>
            )}

            <button
               type="submit"
               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
               disabled={loading}
            >
               {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
               ) : (
                  "Submit"
               )}
            </button>
         </form>
      </div>
   );
}
