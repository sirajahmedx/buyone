import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React from "react";

export default function Products() {
   return (
      <div className="flex justify-center">
         <Link href="/products/add" className="mt-10">
            <button className="btn">Add New Products</button>
         </Link>
      </div>
   );
}
