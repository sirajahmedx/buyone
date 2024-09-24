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
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function AddForm({ id }) {
   const [product, setProduct] = useState("");
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

   const router = useRouter();
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

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            setLoading(true);
            const response = await axios.get(`/api/products/get/${id}`);
            const productData = response.data.product;
            setProduct(productData); // Set product data
            setName(productData.name || ""); // Initialize form fields
            setDescription(productData.description || "");
            setPrice(productData.price || "");
            setSubCategory(productData.subCategory);
            setStock(productData.stock);
            setReviews(productData.reviews);
            setTags(productData.tags);
            setIsFeatured(productData.isFeatured);
            setDiscount(productData.discount);
            setImages(productData.images);
            setBrand(productData.brand);
            console.log(productData.properties);
            setProperties(productData.properties);
            // const fetchCategories = async () => {
            //    const response = await axios.get("/api/categories/get");
            //    console.log(response.data.categories);
            //    setCategories(response.data.categories);
            // };
            // fetchCategories();
            setLoading(false);
         } catch (err) {
            setError("Error fetching product data.");
         }
      };

      fetchProduct();
   }, [id]);

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
            stock,
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
         await axios.put(`/api/products/edit/${id}`, catData);
         router.push("/products");
         setSuccess("Product Updated Successfully successfully!");
      } catch (err) {
         console.log(err);
         setError(err.message);
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

   if (loading) {
      return <Loading />;
   }
   return (
      <div className="min-h-screen flex flex-col items-center bg-gray-900 p-4">
         <main className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-100 mb-6 flex items-center">
               <StoreIcon className="mr-2" fontSize="large" />
               Submit Product Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="mb-5">
                  <label
                     htmlFor="name"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Name
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
                     htmlFor="brand"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Brand
                  </label>
                  <input
                     type="number"
                     id="brand"
                     value={brand}
                     onChange={(e) => setPrice(e.target.value)}
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter brand"
                     required
                  />
               </div>

               <div className="my-5">
                  <label
                     htmlFor="category"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Category
                  </label>
                  <select
                     id="category"
                     className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
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
               </div>

               <div className="my-5">
                  <label
                     htmlFor="subCategory"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     subCategory
                  </label>
                  <select
                     id="subCategory"
                     className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                     value={subCategory}
                     onChange={(e) => setSubCategory(e.target.value)}
                  >
                     <option value="" disabled>
                        Select a subCategory
                     </option>
                     {subCategories.map((c, index) => (
                        <option key={c} value={c}>
                           {c}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="flex flex-col w-full">
                  <div className="text-center">
                     <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                           setProperties([
                              ...properties,
                              { name: "", values: "" },
                           ])
                        }
                        className="btn-primary outline-double text-white py-3 px-4 rounded w-[50%] my-4"
                     >
                        {/* {loading ? "Adding..." : "Add New Property"} */}
                        Add New Property
                     </button>
                  </div>
                  {properties.map((property, index) => (
                     <div className="flex items-center justify-between">
                        <input
                           type="text"
                           id="propName"
                           className="w-[44%] px-3 py-2 my-3 mr-2 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                           placeholder="Name"
                           value={property.name}
                           onChange={(e) => setPropName(index, e.target.value)}
                        />
                        <input
                           type="text"
                           id="propValue"
                           className="w-[45%] px-3 py-2  my-3 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                           placeholder="Values"
                           value={property.values}
                           onChange={(e) =>
                              setPropValues(index, e.target.value)
                           }
                        />

                        <button
                           type="button"
                           onClick={() => removeProperty(index)}
                           className="border-none flex items-center text-red-400 hover:text-red-600 transition-colors duration-200"
                        >
                           <DeleteIcon className="" fontSize="large" />
                        </button>
                     </div>
                  ))}
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
                     htmlFor="stock"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Stock
                  </label>
                  <input
                     type="number"
                     id="stock"
                     value={stock}
                     onChange={(e) => setStock(e.target.value)}
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter stock quantity"
                     required
                  />
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="affiliateLink"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Affiliate Link
                  </label>
                  <input
                     type="url"
                     id="affiliateLink"
                     value={affiliateLink}
                     onChange={(e) => setAffiliateLink(e.target.value)}
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter affiliate link"
                     required
                  />
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="ratings"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Ratings (0-5)
                  </label>
                  <input
                     type="number"
                     id="ratings"
                     value={ratings}
                     onChange={(e) => setRatings(e.target.value)}
                     min="0"
                     max="5"
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter ratings"
                     required
                  />
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="reviews"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Reviews
                  </label>
                  <input
                     type="number"
                     id="reviews"
                     value={reviews}
                     onChange={(e) => setReviews(e.target.value)}
                     min="0"
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter number of reviews"
                  />
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="tags"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Tags (comma separated)
                  </label>
                  <input
                     type="text"
                     id="tags"
                     value={tags.join(", ")}
                     onChange={handleTagsChange}
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter tags"
                  />
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="isFeatured"
                     className="inline-flex items-center"
                  >
                     <input
                        type="checkbox"
                        id="isFeatured"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="form-checkbox"
                     />
                     <span className="ml-2 text-sm text-gray-300">
                        Featured
                     </span>
                  </label>
               </div>

               <div className="mb-5">
                  <label
                     htmlFor="discount"
                     className="block text-sm font-medium text-gray-300 mb-1"
                  >
                     Discount (%)
                  </label>
                  <input
                     type="number"
                     id="discount"
                     value={discount}
                     onChange={(e) => setDiscount(e.target.value)}
                     min="0"
                     max="100"
                     className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200"
                     placeholder="Enter discount percentage"
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
         </main>
      </div>
   );
}
