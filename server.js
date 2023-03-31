import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

//importing database
import connectDb from "./db/connect.js";
// import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoute.js";
import blogRoutes from "./routes/blogRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

//mount contact routes middleware
app.use(express.static("uploads"));

app.use("/contact", contactRoutes);
app.use("/blogs", blogRoutes);
app.use("/login", userRoutes);
//Establishing connection with database
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`app is listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
