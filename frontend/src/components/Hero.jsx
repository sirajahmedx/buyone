"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
   {
      id: 1,
      name: "Premium Wireless Headphones",
      description:
         "Experience crystal-clear sound with our latest noise-cancelling technology. Perfect for music lovers and professionals alike.",
      image: `/valley.jpeg`,
   },
   {
      id: 2,
      name: "Smart Fitness Tracker",
      description:
         "Track your health and fitness goals with precision. Features heart rate monitoring, sleep tracking, and smartphone notifications.",
      image: `/valley.jpeg`,
   },
   {
      id: 3,
      name: "4K Ultra HD Smart TV",
      description:
         "Immerse yourself in stunning visuals with our 4K Ultra HD display. Smart features for easy streaming and connectivity.",
      image: `/valley.jpeg`,
   },
];

export default function HeroSlider() {
   const [currentIndex, setCurrentIndex] = useState(0);

   const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
   };

   const prevSlide = () => {
      setCurrentIndex(
         (prevIndex) => (prevIndex - 1 + products.length) % products.length
      );
   };

   useEffect(() => {
      const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
      return () => clearInterval(timer);
   }, []);

   return (
      <div className="w-full py-16">
         <div className="max-w-7xl mx-auto px-4">
            <Card>
               <CardBody className="p-0 overflow-hidden">
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                     <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        onPress={prevSlide}
                        className="bg-white/10 text-white hover:bg-white/20"
                     >
                        <ChevronLeft size={24} />
                     </Button>
                  </div>
                  <div className="flex flex-col md:flex-row items-center ml-8">
                     <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                           {products[currentIndex].name}
                        </h2>
                        <p className="text-[#B3C5D7] mb-6">
                           {products[currentIndex].description}
                        </p>
                        <Button
                           color="primary"
                           className="bg-[#5689A6] text-white rounded-md"
                        >
                           Learn More
                        </Button>
                     </div>
                     <div className="w-full md:w-1/2 relative">
                        <Image
                           src={products[currentIndex].image}
                           alt={products[currentIndex].name}
                           className="w-full h-[400px] object-cover"
                        />
                     </div>
                  </div>
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                     <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        onPress={nextSlide}
                        className="bg-white/10 text-white hover:bg-white/20"
                     >
                        <ChevronRight size={24} />
                     </Button>
                  </div>
               </CardBody>
            </Card>
         </div>
      </div>
   );
}
