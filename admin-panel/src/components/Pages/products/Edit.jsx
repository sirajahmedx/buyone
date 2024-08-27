"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
   Store as StoreIcon,
   Image as ImageIcon,
   UploadFile,
   UploadRounded,
} from "@mui/icons-material";

import Loading from "../../Loading";
import Success from "../../Success";

export default function EditForm({ id }) {
   const router = useRouter();
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
         await axios.put(`/api/products/edit/${id}`, {
            title,
            description,
            price,
         });
         setSuccess("Product updated successfully!"); // Corrected success message
         setTitle("");
         setDescription("");
         setPrice("");
         router.push("/products"); // Redirect to /products after success
      } catch (error) {
         console.log(error);
         setError("An error occurred while updating the product.");
      } finally {
         setLoading(false);
      }
   };

   const handleImageUpload = async (e) => {
      try {
         console.log(e);
         const files = e.target.files;
         if (files?.length > 0) return;
         const data = new FormData();
         files.forEach((file) => data.append("file", file));
         await axios.post("/api/products/upload-image", data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         console.log("Done");
      } catch (error) {
         console.error("Error uploading image:", error);
      }
   };

   if (loading) {
      return <Loading />;
   }

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 shadow-lg rounded-lg bg-gray-800"
         >
            <h2 className="text-3xl font-semibold text-gray-100 mb-6 flex items-center">
               <StoreIcon className="mr-2" fontSize="large" />
               Edit Details
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

            <div className="mb-5">
               <label
                  htmlFor="image"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-between cursor-pointer"
               >
                  <div className="flex items-center justify-center w-full">
                     <ImageIcon fontSize="large" />
                     <span className="ml-4 text-lg">Upload Image</span>
                  </div>
                  <UploadRounded fontSize="large" />
               </label>
               <input
                  type="file"
                  id="image"
                  onChange={(e) => handleImageUpload(e)}
                  className="hidden"
                  accept="image/*"
               />
            </div>

            {success && (
               <div className="mb-5 flex items-center text-green-400">
                  <Success msg={success} />
               </div>
            )}

            {error && (
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
