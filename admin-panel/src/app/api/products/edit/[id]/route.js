import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
   try {
      await dbConnect();

      const body = await req.json();
      const { title, description, price } = body;

      console.log("Received data:", body); // Add this line for debugging

      const product = await Product.findByIdAndUpdate(
         params.id, // Use the ID from the route parameters
         { title, description, price },
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
