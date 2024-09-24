import dbConnect from "@/lib/connect";
import Category from "@/lib/category";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
   try {
      await dbConnect();

      const body = await req.json();
      const { name, parent, properties } = body;

      console.log("Received data:", body); // Add this line for debugging

      const category = await Category.findByIdAndUpdate(
         params.id, // Use the ID from the route parameters
         { name, parent, properties },
         { new: true } // Return the updated document
      );

      if (!category) {
         return NextResponse.json(
            {
               success: false,
               message: "category not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json(
         {
            success: true,
            category,
            message: "category updated successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error updating category:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
