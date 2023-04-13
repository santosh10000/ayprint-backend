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
const connection = process.env.CONNECTION_STRING;
const container = process.env.CONTAINER_NAME;
const connectionObject = {
  connection: connection,
  container: container,
};
export const startConnection = () => {
  return connectionObject;
};
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
//export { startConnection };
