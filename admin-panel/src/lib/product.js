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
      // category: {
      //    type: mongoose.Schema.Types.ObjectId,
      //    ref: "Category", // Reference to the Category model
      //    required: true,
      // },
      category: {
         type: String,
         required: true,
      },
      subCategory: {
         type: String,
         required: true,
      },
      images: {
         type: [String],
         default: [],
      },
     
      isAvailible:{
         type:Boolean,
         required:true,
         default:true
      },
      affiliateLink: {
         type: String,
         required: true,
         trim: true,
      },
      ratings: {
         type: Number,
         default: 0,
         min: 0,
         max: 5,
      },
      reviews: {
         type: Number,
         default: 0,
         min: 0,
      },
      tags: {
         type: [String], // Array of strings for tags
         default: [],
      },
      isFeatured: {
         type: Boolean,
         default: false,
      },
      discount: {
         type: Number, // Optional discount percentage
         min: 0,
         max: 100,
      },
      brand: {
         type: String,
      },
      properties: [Object],
   },
   {
      timestamps: true,
   }
);

const Product =
   mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
