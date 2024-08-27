import dbConnect from "@/lib/connect";
import Category from "@/lib/category";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {
      await dbConnect();

      const { id } = params;

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
         return NextResponse.json(
            {
               success: false,
               message: "Category not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json(
         {
            success: true,
            message: "Category deleted successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error deleting Category:", error); // Add this line for debugging
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
