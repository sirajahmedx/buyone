import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      await dbConnect();

      const products = await Product.find(); // Fetch all products

      return NextResponse.json(
         {
            success: true,
            products,
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error fetching products:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
