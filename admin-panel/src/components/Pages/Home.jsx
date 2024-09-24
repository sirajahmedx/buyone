"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Loading from "../Loading";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Home() {
   const { data: session, status } = useSession();

   if (status === "loading") {
      return <Loading />;
   }

   if (!session) {
      return (
         <main className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
               <button
                  onClick={() => signIn("google")}
                  className="bg-[#1d3557] text-white hover:bg-[#457b9d] py-2 px-4 rounded-lg text-lg font-medium transition duration-300"
               >
                  Login With Google
               </button>
            </div>
         </main>
      );
   }

   return (
      <div className="flex min-h-screen bg-gray-900 justify-between">
         {/* Left Side - Greeting */}
         <div className="p-6 text-white mt-12 ml-4">
            <h1 className="text-2xl">
               Hello, <span className="font-semibold">{session.user.name}</span>
            </h1>
         </div>

         {/* Right Side - User Info and Options */}
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#457b9d] mt-12 mr-4">
               <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
               />
            </div>
         </div>
      </div>
   );
}
