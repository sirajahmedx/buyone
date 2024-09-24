import React from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
// background: "linear-gradient(to top, #223952, #09182B)",

const products = Array(8)
   .fill(null)
   .map((_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: (Math.random() * 100 + 10).toFixed(2),
      image: `/valley.jpeg`,
   }));

export default function FeaturedProducts() {
   return (
      <section className="w-full pb-4">
         <div className="max-w-[1600px] mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#d8ebff] mb-8">
               Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {products.map((product) => (
                  <Card
                     key={product.id}
                     className="backdrop-blur-md border border-white/20 rounded-md"
                     style={{
                        background:
                           "linear-gradient(to right, #0D2440, #09182B)",
                     }}
                  >
                     <CardBody className="p-0">
                        <Image
                           src={product.image}
                           alt={product.name}
                           className="w-full h-full object-cover"
                        />
                     </CardBody>
                     <CardFooter className="flex flex-col items-start gap-0">
                        <h3 className="text-lg font-semibold text-white">
                           {product.name}
                        </h3>
                        <p className="text-[#B3C5D7] text-md">
                           ${product.price}
                        </p>
                     </CardFooter>
                     <Button
                        color="primary"
                        size="md"
                        className="bg-[#5689A6] text-white w-full mt-2"
                     >
                        View Product
                     </Button>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
}
