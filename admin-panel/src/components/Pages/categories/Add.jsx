"use client";
import React, { useState } from "react";
import axios from "axios";

const Add = ({ modalRef, refreshCategories }) => {
   const [name, setName] = useState("");
   const [parent, setParent] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const category = { name, parent };
      console.log("category", category);

      try {
         setLoading(true);
         await axios.post("/api/categories/add", category);
         setError("");
         setName("");
         setParent("");
         // Refresh categories and close the modal
         refreshCategories();
         if (modalRef.current) {
            modalRef.current.close();
         }
      } catch (error) {
         console.error("Error adding category:", error);
         setError("Error adding category. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   const parents = [
      "Smartphones & Accessories",
      "Laptops & Computers",
      "Headphones & Earbuds",
      "Smartwatches & Wearables",
      "Home Appliances",
      "Gaming Consoles & Accessories",
      "Computer Components",
      "Networking & Routers",
      "Cameras & Photography",
      "Software & Apps",
   ];

   return (
      <div className="flex flex-col items-center justify-center bg-gray-900 rounded p-4 w-full max-w-lg">
         <h2 className="text-2xl font-bold mb-3 text-gray-50">Add Category</h2>
         {error && <p className="text-red-500 mb-4 text-lg">{error}</p>}
         <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-lg"
               >
                  Category Name
               </label>
               <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="parent"
                  className="block text-gray-300 mb-2 text-lg"
               >
                  Parent Category Name
               </label>
               <select
                  className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                  value={parent}
                  onChange={(e) => setParent(e.target.value)}
               >
                  <option value="" disabled>
                     No Parent Category
                  </option>
                  {parents.map((parent) => (
                     <option key={parent} value={parent}>
                        {parent}
                     </option>
                  ))}
               </select>
            </div>
            <button
               type="submit"
               disabled={loading}
               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
               {loading ? "Submitting..." : "Submit"}
            </button>
         </form>
      </div>
   );
};

export default Add;
