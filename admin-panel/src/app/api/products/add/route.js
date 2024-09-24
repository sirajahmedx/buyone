import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      await dbConnect();

      const body = await req.json();
      const {
         name,
         description,
         price,
         category,
         subCategory,
         // stock,
         affiliateLink,
         ratings,
         reviews,
         tags,
         isFeatured,
         discount,
         images,
         brand,
         properties,
      } = body;
      console.log(properties);
      // Validate required fields
      if (!name || !description || !price || !category || !images) {
         return NextResponse.json(
            {
               success: false,
               message:
                  "Name, description, price, category, and images are required",
            },
            { status: 400 }
         );
      }

      // Create new product
      const product = await Product.create({
         name,
         description,
         price,
         category,
         subCategory, // Optional
         // stock, // Optional
         affiliateLink, // Optional
         ratings, // Optional
         reviews, // Optional
         tags, // Optional
         isFeatured: isFeatured || false, // Default to false if not provided
         discount: discount || 0, // Default to 0 if not provided
         images,
         brand,
         properties,
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
