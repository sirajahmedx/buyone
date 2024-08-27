import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      parent: {
         type: String,
         maxlength: 200,
      },
   },
   {
      timestamps: true,
   }
);

const Category =
   mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
