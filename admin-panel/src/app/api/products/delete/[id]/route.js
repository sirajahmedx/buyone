import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {
      await dbConnect();

      // Get product ID from the URL parameters
      const { id } = params;

      // Delete the product by ID
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
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
            message: "Product deleted successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error deleting product:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
