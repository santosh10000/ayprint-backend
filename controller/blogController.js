import Blog from "../models/Blogs.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

const addBlog = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err.message });
      }

      const { title, tags, description, testimonial, reviewer, review } =
        req.body;
      const imagePath = req.file ? `${req.file.filename}` : "";
      console.log(imagePath);
      console.log(req.body);

      const blog = new Blog({
        title,
        tags,
        description,
        testimonial,
        reviewer,
        review,
        image: imagePath,
      });

      await blog.save();

      res.status(201).send({ success: true, data: blog });
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).send({ success: true, data: blogs });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

export { addBlog, getBlogs };
