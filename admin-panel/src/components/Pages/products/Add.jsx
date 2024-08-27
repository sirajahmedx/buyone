"use client";
import React, { useState } from "react";
import Success from "../../Success";
import axios from "axios";
import { generatePutUrl } from "@/lib/aws";
import {
   Store as StoreIcon,
   Image as ImageIcon,
   UploadRounded,
} from "@mui/icons-material";

export default function Add({ modalRef, refreshCategories }) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [uploading, setUploading] = useState(false);
   const [images, setImages] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess("");

      try {
         await axios.post("/api/products/add", {
            name,
            description,
            price,
            images,
         });
         setSuccess("Product added successfully");
         setName("");
         setDescription("");
         setPrice("");
         setImages([]);
         refreshCategories();
         if (modalRef.current) {
            modalRef.current.close();
         }
      } catch (error) {
         setError("An error occurred while adding the product");
         console.error("Error adding product:", error);
      } finally {
         setLoading(false);
      }
   };

   async function handleImageUpload(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
         setUploading(true);
         try {
            const uploadPromises = Array.from(files).map(async (file) => {
               const response = await axios.post("/api/aws/get-presigned-url", {
                  fileName: file.name,
                  fileType: file.type,
               });

               if (response.status !== 200) {
                  throw new Error(
                     `Failed to get pre-signed URL: ${response.statusText}`
                  );
               }

               const { url } = response.data;

               const uploadResponse = await axios.put(url, file, {
                  headers: { "Content-Type": file.type },
               });

               if (uploadResponse.status !== 200) {
                  throw new Error(
                     `Failed to upload file: ${uploadResponse.statusText}`
                  );
               }

               const fileUrl = `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${file.name}`;
               setImages((oldImages) => [...oldImages, fileUrl]);

               return fileUrl;
            });

            await Promise.all(uploadPromises);
         } catch (error) {
            setError(
               `An error occurred while uploading the image: ${error.message}`
            );
         } finally {
            setUploading(false);
         }
      }
   }

   return (
      <div className="flex justify-center items-center bg-gray-900 p-4">
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg shadow-lg rounded-lg bg-gray-900"
         >
            <h2 className="text-3xl font-semibold text-gray-100 mb-6 flex items-center">
               <StoreIcon className="mr-2" fontSize="large" />
               Submit Details
            </h2>

            <div className="mb-5">
               <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
               >
                  name
               </label>
               <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                  placeholder="Enter name"
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

            <div className="mb-5 flex flex-wrap gap-4">
               {images.map((link, index) => (
                  <img
                     key={index}
                     src={link}
                     alt={`Uploaded Image ${index + 1}`}
                     className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                  />
               ))}
            </div>

            <div className="mb-5">
               <label
                  htmlFor="image"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-between cursor-pointer"
               >
                  <div className="flex items-center">
                     <ImageIcon fontSize="large" />
                     <span className="ml-4 text-lg">Upload Image</span>
                  </div>
                  <UploadRounded fontSize="large" />
               </label>
               <input
                  type="file"
                  id="image"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  multiple
               />
            </div>

            {success && (
               <div className="mb-5 flex items-center text-green-400">
                  <Success msg={success} />
               </div>
            )}

            {error && (
               <div className="mb-5 text-red-400 flex items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6 mr-2"
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
