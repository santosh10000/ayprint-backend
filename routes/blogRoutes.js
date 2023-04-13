// Import the necessary modules
import express from "express";
import {
  addBlog,
  getBlogs,
  updateBlog,
  toBeUpdateBlogs,
} from "../controller/blogController.js";

// Create a new router instance
const blogRoutes = express.Router();

// Define a route that will handle a POST request to add a new blog
blogRoutes.route("/addBlog").post(addBlog);
blogRoutes.route("/").get(getBlogs);
blogRoutes.route("/update").get(toBeUpdateBlogs);
blogRoutes.route("/:id").patch(updateBlog);

// Export the blogRoutes router
export default blogRoutes;
