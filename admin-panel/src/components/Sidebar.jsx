"use client";

import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
   const pathname = usePathname();

   console.log(pathname);

   return (
      <div className="lg:drawer-open">
         <div className="h-full bg-gray-800 text-white w-72 p-4">
            {/* Logo Section */}
            <div className="flex justify-start mb-20 hover:text-blue-400">
               <Link href="/">
                  <StoreIcon className="mr-2" fontSize="large" />
                  <span className="text-lg">Tech-Emporium</span>
               </Link>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4">
               <li
                  className={`flex items-center hover:text-blue-400 ${
                     pathname === "/" ? "text-blue-800" : ""
                  }`}
               >
                  <HomeIcon className="mr-4" fontSize="large" />
                  <Link href="/" className="text-xl">
                     Home
                  </Link>
               </li>
               <li
                  className={`flex items-center hover:text-blue-400 ${
                     pathname === "/products" ? "text-blue-400" : ""
                  }`}
               >
                  <ShoppingCartIcon className="mr-4" fontSize="large" />
                  <Link href="/products" className="text-xl">
                     Products
                  </Link>
               </li>
               <li
                  className={`flex items-center hover:text-blue-400 ${
                     pathname === "/orders" ? "text-blue-400" : ""
                  }`}
               >
                  <InventoryIcon className="mr-4" fontSize="large" />
                  <Link href="/orders" className="text-xl">
                     Orders
                  </Link>
               </li>
               <li
                  className={`flex items-center hover:text-blue-400 ${
                     pathname === "/settings" ? "text-blue-400" : ""
                  }`}
               >
                  <SettingsIcon className="mr-4" fontSize="large" />
                  <Link href="/settings" className="text-xl">
                     Settings
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}
