import dbConnect from "@/lib/connect";
import Category from "@/lib/category";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   try {
      await dbConnect();
      const { id } = params;
      const category = await Category.findById(id);

      if (!category) {
         return NextResponse.json(
            { success: false, message: "category not found" },
            { status: 404 }
         );
      }

      return NextResponse.json({ success: true, category }, { status: 200 });
   } catch (error) {
      console.error("Error fetching category:", error);
      return NextResponse.json(
         { success: false, message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
