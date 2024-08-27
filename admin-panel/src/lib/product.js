import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         required: true,
         trim: true,
      },
      price: {
         type: Number,
         required: true,
         min: 0,
      },
      images: {
         type: [String],
      },
   },
   {
      timestamps: true, // Automatically add createdAt and updatedAt fields
   }
);

const Product =
   mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
