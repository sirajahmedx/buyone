import React from "react";
import { Link } from "@nextui-org/react";
import { Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
   return (
      <footer
         className="w-full py-8 px-4"
         style={{
            // background: "linear-gradient(to bottom, #223952, #09182B)",
            background: "linear-gradient(to bottom, #223952, #09182B)",
         }}
      >
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
               <h3 className="text-white text-lg font-semibold">About Us</h3>
               <p className="text-[#B3C5D7] text-sm">
                  We are a company dedicated to providing innovative solutions
                  for our customers.
               </p>
            </div>

            <div className="flex flex-col space-y-4">
               <h3 className="text-white text-lg font-semibold">Quick Links</h3>
               <Link
                  href="#"
                  color="foreground"
                  className="text-[#B3C5D7] hover:text-white"
               >
                  Home
               </Link>
               <Link
                  href="#"
                  color="foreground"
                  className="text-[#B3C5D7] hover:text-white"
               >
                  Services
               </Link>
               <Link
                  href="#"
                  color="foreground"
                  className="text-[#B3C5D7] hover:text-white"
               >
                  Products
               </Link>
               <Link
                  href="#"
                  color="foreground"
                  className="text-[#B3C5D7] hover:text-white"
               >
                  Contact
               </Link>
            </div>

            <div className="flex flex-col space-y-4">
               <h3 className="text-white text-lg font-semibold">Contact Us</h3>
               <p className="text-[#B3C5D7] text-sm">
                  123 Main Street, Anytown, ST 12345
               </p>
               <p className="text-[#B3C5D7] text-sm">Phone: (123) 456-7890</p>
               <p className="text-[#B3C5D7] text-sm">Email: info@example.com</p>
            </div>

            <div className="flex flex-col space-y-4">
               <h3 className="text-white text-lg font-semibold">Follow Us</h3>
               <div className="flex space-x-4">
                  <Link
                     href="https://www.instagram.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#B3C5D7] hover:text-white"
                  >
                     <Instagram size={24} />
                  </Link>
                  <Link
                     href="https://www.youtube.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#B3C5D7] hover:text-white"
                  >
                     <Youtube size={24} />
                  </Link>
                  <Link
                     href="https://www.facebook.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#B3C5D7] hover:text-white"
                  >
                     <Facebook size={24} />
                  </Link>
               </div>
            </div>
         </div>

         <div className="mt-8 text-center text-[#B3C5D7] text-sm">
            © 2023 Your Company Name. All rights reserved.
         </div>
      </footer>
   );
}
