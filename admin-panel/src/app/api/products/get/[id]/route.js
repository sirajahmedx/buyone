import dbConnect from "@/lib/connect";
import Product from "@/lib/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   try {
      await dbConnect();

      const product = await Product.findById(params.id);

      if (!product) {
         return NextResponse.json(
            { success: false, message: "Product not found" },
            { status: 404 }
         );
      }

      return NextResponse.json({ success: true, product }, { status: 200 });
   } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
         { success: false, message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
