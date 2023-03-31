import mongoose from "mongoose";

const SubProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: false },
  img: { type: String, required: true },
  img1: { type: String, required: true },
  img2: { type: String, required: true },
  description2: { type: String, required: false },
});

const SubProduct = mongoose.model("SubProduct", SubProductSchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  subProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubProduct" }],
});

const Product = mongoose.model("Product", ProductSchema);

export { Product, SubProduct };
