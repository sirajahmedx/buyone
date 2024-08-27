import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      await dbConnect();

      const body = await req.json();
      const { title, description, price, images } = body;

      // Validate input
      if (!title || !description || !price || !images) {
         return NextResponse.json(
            { success: false, message: "All fields are required" },
            { status: 400 }
         );
      }

      // Create new product
      const product = await Product.create({
         title,
         description,
         price,
         images,
      });

      return NextResponse.json(
         { success: true, product, message: "Product added successfully" },
         { status: 201 }
      );
   } catch (error) {
      console.error("Error adding product:", error);
      return NextResponse.json(
         { success: false, message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
