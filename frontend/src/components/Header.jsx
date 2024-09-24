import React from "react";
import {
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   Link,
   Input,
   Button,
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

export default function Header() {
   return (
      <Navbar
         maxWidth="full"
         style={{
            background: "linear-gradient(to bottom, #223952, #09182B)",
            padding: "0.5rem 1rem",
         }}
      >
         <NavbarBrand>
            <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">
               <span className="text-white font-bold">LOGO</span>
            </div>
         </NavbarBrand>

         <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
               <Link
                  color="foreground"
                  href="#"
                  className="text-white hover:text-[#B3C5D7]"
               >
                  Home
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  color="foreground"
                  href="#"
                  className="text-white hover:text-[#B3C5D7]"
               >
                  Services
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  color="foreground"
                  href="#"
                  className="text-white hover:text-[#B3C5D7]"
               >
                  Products
               </Link>
            </NavbarItem>
         </NavbarContent>

         <NavbarContent justify="end">
            <NavbarItem>
               <Input
                  classNames={{
                     base: "max-w-full sm:max-w-[10rem] h-10",
                     mainWrapper: "h-full",
                     input: "text-small",
                     inputWrapper:
                        "h-full font-normal text-white bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20",
                  }}
                  placeholder="Search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
               />
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
               <Button
                  color="primary"
                  href="#"
                  variant="flat"
                  className="bg-[#5689A6] text-white"
               >
                  Sign Up
               </Button>
            </NavbarItem>
         </NavbarContent>
      </Navbar>
   );
}
