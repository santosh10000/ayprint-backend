import dotenv from "dotenv";
dotenv.config();
import { products, subProducts } from "../src/components/data/product.mjs";
import { Product, SubProduct } from "./models/Products.js";
import connectDb from "./db/connect.js";
// const { products, subProducts } = productsData;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);

    // Adding main products to the database
    //   await Promise.all(products.map(async (product) => {
    //     const newProduct = new Product({
    //       name: product.name,
    //       category: product.category,
    //       description: product.description,
    //       image: product.image
    //     });
    //     await newProduct.save();
    //   }));

    //   // Adding sub products to the database
    //   await Promise.all(subProducts.map(async (subProduct) => {
    //     const newSubProduct = new SubProduct({
    //       id: subProduct.id,
    //       name: subProduct.name,
    //       category: subProduct.category,
    //       description: subProduct.description,
    //       price: subProduct.price,
    //       img: subProduct.img,
    //       img1: subProduct.img1,
    //       img2: subProduct.img2,
    //       description2: subProduct.description2
    //     });
    //     await newSubProduct.save();
    //   }));

    // console.log("Data added successfully!");
    // process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
//   This code first connects to the database using the connectDb function from your db/connect.js module. Then, it uses Promise.all to add all the products to the Product collection and all the subProducts to the SubProduct collection in parallel. Finally, it logs a message to the console indicating that the data was added successfully, and exits the process.

//   Note that you may need to modify the schema definitions in your Products.js and SubProducts.js modules to match the fields in your product.js file.
