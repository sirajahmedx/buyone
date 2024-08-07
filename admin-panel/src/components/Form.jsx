"use client";
import React, { useState } from "react";

export default function Form() {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log({ title, description, price });
   };

   return (
      <div className="flex justify-start pt-4 ">
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 shadow-md rounded-lg bg-slate-900"
         >
            <h2 className="text-2xl font-bold mb-4">Submit Details</h2>

            <div className="mb-4">
               <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-100 mb-1"
               >
                  Title
               </label>
               <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 bg-none"
                  placeholder="Enter title"
                  required
               />
            </div>

            <div className="mb-4">
               <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-100 mb-1"
               >
                  Description
               </label>
               <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter description"
                  rows="4"
                  required
               />
            </div>

            <div className="mb-4">
               <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-100 mb-1"
               >
                  Price
               </label>
               <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter price"
                  required
               />
            </div>

            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
               Submit
            </button>
         </form>
      </div>
   );
}
