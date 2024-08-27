import dbConnect from "@/lib/connect";
import Category from "@/lib/category";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      await dbConnect();

      const categories = await Category.find({}); // Fetch all products

      return NextResponse.json(
         {
            success: true,
            categories,
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
