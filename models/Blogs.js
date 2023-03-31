import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  reviewer: {
    type: String,
    required: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
