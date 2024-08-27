"use client";
import React, { useState } from "react";
import Success from "../Success";
import axios from "axios";
// import axios from "axios";
import { generatePutUrl } from "@/lib/aws";
import {
   Store as StoreIcon,
   Image as ImageIcon,
   UploadRounded,
} from "@mui/icons-material";

export default function AddForm() {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [uploading, setUploading] = useState(false);
   const [images, setImages] = useState([]); // Add state for images

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
            images, // Include images in the POST request
         });
         setSuccess("Product added successfully");

         setTitle("");
         setDescription("");
         setPrice("");
         setImages([]); // Clear images after successful submission
      } catch (error) {
         setError("An error occurred while adding the product");
         console.error("Error adding product:", error);
      } finally {
         setLoading(false);
      }
   };

   // const image = [];

   async function handleImageUpload(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
         setUploading(true);
         try {
            const uploadPromises = Array.from(files).map(async (file) => {
               // Get the pre-signed URL for uploading the file
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
               console.log(url);

               // Upload the file directly to S3 using the pre-signed URL
               const uploadResponse = await axios.put(url, file, {
                  headers: {
                     "Content-Type": file.type,
                  },
               });
               console.log(uploadResponse);

               if (uploadResponse.status !== 200) {
                  throw new Error(
                     `Failed to upload file: ${uploadResponse.statusText}`
                  );
               }

               // Construct the URL of the uploaded file
               const fileUrl = `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${file.name}`;
               console.log(fileUrl);

               // Update the images state array with the new file URL
               setImages((oldImages) => [...oldImages, fileUrl]);

               console.log(fileUrl);
               return fileUrl;
            });

            // Wait for all uploads to complete
            await Promise.all(uploadPromises);
            console.log("All files uploaded successfully");
         } catch (error) {
            console.error("Error uploading image:", error.message);
            setError(
               `An error occurred while uploading the image: ${error.message}`
            );
         } finally {
            setUploading(false);
         }
      }
   }

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 shadow-lg rounded-lg bg-gray-800"
         >
            <h2 className="text-3xl font-semibold text-gray-100 mb-6 flex items-center">
               <StoreIcon className="mr-2" fontSize="large" />
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

            <div className="mb-5 w-full">
               {!!images.map((link)=>(
                  <image src={link} width={400} height={200}/>
               ))}

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
                  // multiple
               />
            </div>

            {images.length > 0 &&
               images.map((image, index) => <div>{index}</div>)}

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
