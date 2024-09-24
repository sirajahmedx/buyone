import React from "react";
import { Card, CardBody, Image, Button, Chip } from "@nextui-org/react";
import { Star, ShoppingCart } from "lucide-react";

// This would typically come from an API or database
const product = {
   name: "Premium Wireless Headphones",
   description:
      "Experience crystal-clear sound with our latest noise-cancelling technology. Perfect for music lovers and professionals alike. These headphones offer superior comfort for extended wear and connect seamlessly with all your devices.",
   price: 299.99,
   category: "Electronics",
   subCategory: "Audio",
   images: [
      "/placeholder.svg?height=400&width=400&text=Image+1",
      "/placeholder.svg?height=400&width=400&text=Image+2",
      "/placeholder.svg?height=400&width=400&text=Image+3",
   ],
   ratings: 4.5,
   discount: 10,
   properties: [
      { name: "Brand", value: "SoundMaster" },
      { name: "Wireless", value: "Yes" },
      { name: "Battery Life", value: "20 hours" },
      { name: "Noise Cancelling", value: "Active" },
   ],
};

export default function ProductDetails() {
   const discountedPrice = product.price * (1 - product.discount / 100);

   return (
      <div className="w-full bg-[#09182B] min-h-screen py-16">
         <div className="max-w-7xl mx-auto px-4">
            <Card className="bg-gradient-to-b from-[#223952] to-[#09182B]">
               <CardBody className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <div className="mb-4">
                           <Image
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-auto object-cover rounded-lg"
                           />
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                           {product.images.slice(1).map((img, index) => (
                              <Image
                                 key={index}
                                 src={img}
                                 alt={`${product.name} - Image ${index + 2}`}
                                 className="w-24 h-24 object-cover rounded-lg"
                              />
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-white">
                           {product.name}
                        </h1>
                        <div className="flex items-center gap-2">
                           <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                       i < Math.floor(product.ratings)
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                    }`}
                                 />
                              ))}
                           </div>
                           <span className="text-[#B3C5D7]">
                              {product.ratings} out of 5
                           </span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-3xl font-bold text-white">
                              ${discountedPrice.toFixed(2)}
                           </span>
                           {product.discount > 0 && (
                              <>
                                 <span className="text-xl text-[#B3C5D7] line-through">
                                    ${product.price.toFixed(2)}
                                 </span>
                                 <Chip color="danger">
                                    {product.discount}% OFF
                                 </Chip>
                              </>
                           )}
                        </div>
                        <p className="text-[#B3C5D7]">{product.description}</p>
                        <div className="space-y-2">
                           <p className="text-white">
                              Category:{" "}
                              <span className="text-[#B3C5D7]">
                                 {product.category}
                              </span>
                           </p>
                           <p className="text-white">
                              Sub-category:{" "}
                              <span className="text-[#B3C5D7]">
                                 {product.subCategory}
                              </span>
                           </p>
                        </div>
                        <Button
                           color="primary"
                           size="lg"
                           className="bg-[#5689A6] text-white w-full"
                           startContent={<ShoppingCart />}
                        >
                           Add to Cart
                        </Button>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                           <h3 className="text-xl font-semibold text-white mb-2">
                              Properties
                           </h3>
                           <div className="grid grid-cols-2 gap-2">
                              {product.properties.map((prop, index) => (
                                 <div key={index} className="text-[#B3C5D7]">
                                    <span className="font-semibold">
                                       {prop.name}:
                                    </span>{" "}
                                    {prop.value}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </CardBody>
            </Card>
         </div>
      </div>
   );
}
