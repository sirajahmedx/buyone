import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      subcategory: {
         type: String,
      },
      properties: [Object],
   },
   {
      timestamps: true,
   }
);

const Category =
   mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
