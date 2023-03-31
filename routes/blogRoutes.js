// Import the necessary modules
import express from "express";
import { addBlog, getBlogs } from "../controller/blogController.js";
// Create a new router instance
const blogRoutes = express.Router();

// Define a route that will handle a POST request to add a new blog
blogRoutes.route("/addBlog").post(addBlog);
blogRoutes.route("/").get(getBlogs);

// Export the blogRoutes router
export default blogRoutes;
