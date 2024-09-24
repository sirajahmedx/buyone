"use client";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
   Store as StoreIcon,
   Image as ImageIcon,
   UploadRounded,
} from "@mui/icons-material";
// import { useSession } from "next-auth/react";
// import NotRegistered from "@/components/NotRegistered";

export default function EditForm({ id }) {
   // const { data: session, status } = useSession();
   const [name, setName] = useState("");
   const [parent, setParent] = useState("");
   const [category, setCategory] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [properties, setProperties] = useState([]);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await axios.get(`/api/categories/get/${id}`);
            const categoryData = response.data.category;

            console.log(categoryData); // Set product data
            setCategory(categoryData);
            setName(categoryData.name || ""); // Initialize form fields
            setParent(categoryData.parent || "");
            setProperties(categoryData.properties || []);
            console.log(properties);
         } catch (err) {
            setError("Error fetching product data.");
         }
      };

      fetchProduct();
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
         await axios.put(`/api/categories/edit/${id}`, {
            name,
            parent,
            properties,
         });
         router.push("/categories");
      } catch (error) {
         setError("An error occurred while updating the product.");
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

   // if (!session) {
   //    return(
   //       <NotRegistered />
   //    )
   // }

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 ">
         <form
            onSubmit={handleSubmit}
            className="w-full p-8 bg-gray-900 rounded-lg shadow-md max-w-lg"
         >
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
               <StoreIcon className="mr-2" fontSize="large" />
               Edit Category
            </h2>

            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-300 mb-1"
               >
                  Name
               </label>
               <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                  placeholder="Enter name"
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
                  className="w-full px-3 py-3 rounded border border-gray-400 bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
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

            <div className="flex flex-col w-full">
               <div className="text-center">
                  <button
                     type="button"
                     disabled={loading}
                     onClick={() =>
                        setProperties([...properties, { name: "", values: "" }])
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
                        onChange={(e) => setPropValues(index, e.target.value)}
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

            {error && (
               <div className="mb-4 text-red-400 flex items-center">
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
               className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
