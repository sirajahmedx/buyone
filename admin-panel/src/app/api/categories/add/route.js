import Category from "@/lib/category";
import dbConnect from "@/lib/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
   try {
      const { name, subcategory, properties } = await request.json();

      if (!name) {
         return NextResponse.json({
            error: "Name is required",
         });
      }
      await dbConnect();

      await Category.create({
         name,
         subcategory,
         properties,
      });
      return NextResponse.json(
         { success: true, message: "Product added successfully!" },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error Adding Category:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
