import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
   try {
      await dbConnect();

      const body = await req.json();
      const {
         name,
         description,
         price,
         category,
         subcategory,
         stock,
         affiliateLink,
         ratings,
         reviews,
         tags,
         isFeatured,
         discount,
         images,
         properties
      } = body;

      console.log("Received data:", body); // Add this line for debugging

      const product = await Product.findByIdAndUpdate(
         params.id, // Use the ID from the route parameters
         {
            name,
            description,
            price,
            category,
            subcategory, // Optional
            stock, // Optional
            affiliateLink, // Optional
            ratings, // Optional
            reviews, // Optional
            tags, // Optional
            isFeatured: isFeatured || false, // Default to false if not provided
            discount: discount || 0, // Default to 0 if not provided
            images,
            properties
         },
         { new: true } // Return the updated document
      );

      if (!product) {
         return NextResponse.json(
            {
               success: false,
               message: "Product not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json(
         {
            success: true,
            product,
            message: "Product updated successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error updating product:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
