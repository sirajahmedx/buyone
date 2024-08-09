import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      title: {
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
      image: {
         type: String,
         trim: true,
      },
   },
   {
      timestamps: true, // Automatically add createdAt and updatedAt fields
   }
);

const Product =
   mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
