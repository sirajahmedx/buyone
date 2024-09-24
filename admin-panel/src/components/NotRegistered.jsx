import React from "react";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

function NotRegistered() {
   const router = useRouter();

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
         <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg flex items-center justify-center flex-col">
            {/* Warning Message */}
            <p className="text-red-400 mb-4 text-xl">
               You must be logged in to access this page.
            </p>
            {/* Additional Information */}
            <p className="text-gray-200 mb-6 text-md text-center">
               Please log in to continue. Logging in ensures secure access to
               your account and personalized features.
            </p>
            {/* Home Button */}
            <Link
               href="/"
               className="flex items-center justify-center bg-[#1d3557] text-white hover:bg-[#457b9d] py-2 px-4 rounded-lg text-sm font-medium transition duration-300"
            >
               <HomeIcon className="mr-2" />
               Go To Home Page
            </Link>
         </div>
      </div>
   );
}

export default NotRegistered;
