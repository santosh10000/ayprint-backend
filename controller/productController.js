import { Product, SubProduct } from "../models/Product.js";

// Controller function to add a new product
const addProduct = async (req, res) => {
  const { name, category, description, image, subProducts } = req.body;

  try {
    // Create a new product document
    const newProduct = new Product({
      name,
      category,
      description,
      image,
      subProducts: [],
    });

    // Create sub-product documents for each sub-product and add them to the product
    for (const subProduct of subProducts) {
      const newSubProduct = new SubProduct(subProduct);
      await newSubProduct.save();
      newProduct.subProducts.push(newSubProduct);
    }

    // Save the new product document to the database
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default addProduct;
