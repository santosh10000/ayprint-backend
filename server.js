import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Update with your frontend domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
