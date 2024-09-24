"use client";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { signOut, useSession } from "next-auth/react";
import NotRegistered from "@/components/NotRegistered";

function Profiles() {
   // const { data: session, status } = useSession();

   const handleSignOut = () => {
      signOut()
         .then(() => console.log("User signed out successfully"))
         .catch((error) => console.error("Sign out error:", error));
   };

   // if (!session) {
   //    return <NotRegistered />;
   // }

   return (
      <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-900">
         {/* Profile Card */}
         <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
               {/* Profile Image */}
               <img
                  src={session.user.image || "/default-profile.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#457b9d]"
               />
            </div>
            {/* Profile Info */}
            <div className="text-center">
               <h2 className="text-xl font-semibold mb-2 text-white">
                  {session.user.name}
               </h2>
               <p className="text-gray-300 mb-4">{session.user.email}</p>
            </div>
            {/* Logout Button */}
            <button
               className="w-full bg-[#e63946] text-white hover:bg-red-600 py-2 px-6 rounded-lg text-sm font-medium transition duration-300"
               onClick={handleSignOut}
            >
               Logout
            </button>
         </div>
         {/* Settings Icon */}
         <div className="absolute top-4 right-4">
            <SettingsIcon
               className="text-gray-300 cursor-pointer hover:text-white"
               fontSize="large"
            />
         </div>
      </div>
   );
}

export default Profiles;
