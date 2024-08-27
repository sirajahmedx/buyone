import Category from "@/lib/category";
import dbConnect from "@/lib/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
   const { name, parent } = await request.json();

   if (!name) {
      return NextResponse.json({
         error: "Name is required",
      });
   }
   await dbConnect();

   await Category.create({
      name,
      parent,
   });

   return NextResponse.json(
      { success: true, message: "Product added successfully!" },
      { status: 200 }
   );
}
