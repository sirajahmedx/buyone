"use client";
import React, { useEffect, useState } from "react";
import Success from "../../Success";
import axios from "axios";
import { generatePutUrl } from "@/lib/aws";
import DeleteIcon from "@mui/icons-material/Delete";
import {
   Store as StoreIcon,
   Image as ImageIcon,
   UploadRounded,
} from "@mui/icons-material";

export default function AddForm() {
   const [name, setName] = useState("");
   const [category, setCategory] = useState("");
   // const [categories, setCategories] = useState([]);
   const [subCategory, setSubCategory] = useState("");
   // const [subcategories, setSubcategories] = useState([]);
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [stock, setStock] = useState("");
   const [affiliateLink, setAffiliateLink] = useState("");
   const [ratings, setRatings] = useState("");
   const [reviews, setReviews] = useState("");
   const [tags, setTags] = useState([]);
   const [isFeatured, setIsFeatured] = useState(false);
   const [discount, setDiscount] = useState("");
   const [images, setImages] = useState([]);
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [uploading, setUploading] = useState(false);
   const [brand, setBrand] = useState("");
   const [properties, setProperties] = useState([]);

   // useEffect(() => {
   //    const fetchCategories = async () => {
   //       try {
   //          const response = await axios.get("/api/categories/get");
   //          setCategories(response.data.categories);
   //       } catch (err) {
   //          setError("Failed to fetch categories.");
   //       }
   //    };
   //    fetchCategories();
   // }, []);

   // useEffect(() => {
   //    const fetchSubcategories = async () => {
   //       if (category) {
   //          try {
   //             const response = await axios.get(
   //                `/api/subcategories/get/${category}`
   //             );
   //             setSubcategories(response.data.subcategories);
   //          } catch (err) {
   //             setError("Failed to fetch subcategories.");
   //          }
   //       }
   //    };
   //    fetchSubcategories();
   // }, [category]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const catData = {
            name,
            category,
            subCategory,
            description,
            price,
            // stock,
            affiliateLink,
            ratings,
            reviews,
            tags,
            isFeatured,
            discount,
            images,
            brand,
            properties,
         };
         await axios.post("/api/products/add", catData);
         setSuccess("Product added successfully!");
      } catch (err) {
         setError("Failed to add product.");
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

   function removeProperty(index) {
      const newProperties = [...properties];
      newProperties.splice(index, 1);
      setProperties(newProperties);
   }

   function setPropName(index, newName) {
      const newProperties = [...properties];
      newProperties[index].name = newName;
      setProperties(newProperties);
   }
   function setPropValues(index, newValues) {
      const newProperties = [...properties];
      newProperties[index].values = newValues;
      setProperties(newProperties);
   }

   const handleTagsChange = (e) =>
      setTags(e.target.value.split(",").map((tag) => tag.trim()));

   const categories = ["1", "2", "3", "4", "5"];
   const subCategories = ["1", "2", "3", "4", "5"];

   return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
         <main className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
               Submit Product Details
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Name"
                  required
               />

               <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
               >
                  <option value="" disabled>
                     Select a Category
                  </option>
                  {categories.map((c, index) => (
                     <option key={index} value={c}>
                        {c}
                     </option>
                  ))}
               </select>

               {/* Add Property Section */}
               <div className="text-center">
                  <button
                     type="button"
                     onClick={() =>
                        setProperties([...properties, { name: "", values: "" }])
                     }
                     className="w-full py-2 rounded bg-blue-600 text-white text-sm"
                  >
                     Add New Property
                  </button>
               </div>
               {properties.map((property, index) => (
                  <div className="flex items-center space-x-2">
                     <input
                        type="text"
                        value={property.name}
                        onChange={(e) => setPropName(index, e.target.value)}
                        className="flex-1 p-2 rounded bg-gray-700 text-gray-200 text-sm"
                        placeholder="Property Name"
                     />
                     <input
                        type="text"
                        value={property.values}
                        onChange={(e) => setPropValues(index, e.target.value)}
                        className="flex-1 p-2 rounded bg-gray-700 text-gray-200 text-sm"
                        placeholder="Property Values"
                     />
                     <button
                        type="button"
                        onClick={() => removeProperty(index)}
                        className="text-red-400 hover:text-red-600"
                     >
                        <DeleteIcon fontSize="small" />
                     </button>
                  </div>
               ))}

               <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
               >
                  <option value="" disabled>
                     Select a Sub Category
                  </option>
                  {subCategories.map((c, index) => (
                     <option key={index} value={c}>
                        {c}
                     </option>
                  ))}
               </select>

               {/* Additional Fields */}
               <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Brand"
               />

               <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Description"
                  rows="3"
                  required
               />

               <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Price"
                  required
               />

               <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Affiliate Link"
                  required
               />

               <input
                  type="number"
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Ratings (0-5)"
                  min="0"
                  max="5"
                  required
               />

               <input
                  type="number"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Reviews"
                  min="0"
               />

               <input
                  type="text"
                  value={tags.join(", ")}
                  onChange={handleTagsChange}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Tags (comma separated)"
               />

               <div className="flex items-center space-x-2">
                  <input
                     type="checkbox"
                     checked={isFeatured}
                     onChange={(e) => setIsFeatured(e.target.checked)}
                     className="form-checkbox"
                  />
                  <span className="text-sm text-gray-300">Featured</span>
               </div>

               <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-gray-200 text-sm"
                  placeholder="Discount (%)"
                  min="0"
                  max="100"
               />

               <div className="flex flex-wrap gap-4">
                  {images.map((link, index) => (
                     <img
                        key={index}
                        src={link}
                        alt={`Uploaded Image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                     />
                  ))}
               </div>

               <div>
                  <label
                     htmlFor="image"
                     className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center cursor-pointer"
                  >
                     Upload Image
                     <UploadRounded className="ml-2" />
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
                  <div className="text-green-400 text-center">{success}</div>
               )}

               {error && (
                  <div className="text-red-400 text-center">{error}</div>
               )}

               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  disabled={loading}
               >
                  {loading ? (
                     <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                     "Submit"
                  )}
               </button>
            </form>
         </main>
      </div>
   );
}
