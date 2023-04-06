import { BlobServiceClient } from "@azure/storage-blob";
import Blog from "../models/Blogs.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=ayprint;AccountKey=69biLkpaDcWGnuFxbGVndBtZ7aJ53oaZkOfIAmxlhVoD2Qh4SgUOeOsYiRvZAy+RUuKctkacl7jD+AStLDSwow==;EndpointSuffix=core.windows.net";
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerName = "ay-printandsign";
const containerClient = blobServiceClient.getContainerClient(containerName);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG and JPEG are allowed."));
    }
  },
}).array("images", 3);

const addBlog = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err.message });
      }

      const { title, tags, description, testimonial, reviewer, review } =
        req.body;

      const imageFiles = req.files;
      const imageUrls = [];

      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          const ext = path.extname(imageFiles[i].originalname);
          const imageBlobName = `${Date.now()}-${i}${ext}`;

          const blockBlobClient =
            containerClient.getBlockBlobClient(imageBlobName);

          const uploadOptions = {
            blobHTTPHeaders: {
              contentType:
                imageFiles[i].mimetype === "image/png"
                  ? "image/png"
                  : "image/jpeg",
            },
          };

          await blockBlobClient.upload(
            imageFiles[i].buffer,
            imageFiles[i].size,
            uploadOptions
          );

          imageUrls.push(blockBlobClient.url);
        }
      }

      const blog = new Blog({
        title,
        tags,
        description,
        testimonial: testimonial ? testimonial : "",
        reviewer: reviewer ? reviewer : "",
        review: review ? review : "",
        image: imageUrls,
      });

      await blog.save();

      res.status(201).send({ success: true, data: blog });
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  console.log("id is " + id);
  const { testimonial, reviewer, review } = req.body;
  console.log(req.body.testimonial, reviewer, review);
  try {
    let blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = blog.title;
    blog.description = blog.description;
    blog.tags = blog.tags;
    if (testimonial && reviewer && review) {
      blog.testimonial = testimonial;
      blog.reviewer = reviewer;
      blog.review = review;
    }

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    const formattedBlogs = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      tags: blog.tags,
      description: blog.description,
      image: blog.image,
      testimonial: blog.testimonial || "",
      reviewer: blog.reviewer || "",
      review: blog.review || "",
    }));
    res.status(200).send({ success: true, data: formattedBlogs });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

export { addBlog, getBlogs, updateBlog };
// import { BlobServiceClient } from "@azure/storage-blob";
// import Blog from "../models/Blogs.js";
// import multer from "multer";
// import path from "path";
// import dotenv from "dotenv";
// dotenv.config();

// const connectionString =
//   "DefaultEndpointsProtocol=https;AccountName=ayprint;AccountKey=69biLkpaDcWGnuFxbGVndBtZ7aJ53oaZkOfIAmxlhVoD2Qh4SgUOeOsYiRvZAy+RUuKctkacl7jD+AStLDSwow==;EndpointSuffix=core.windows.net";

// const blobServiceClient =
//   BlobServiceClient.fromConnectionString(connectionString);

// const containerName = "ay-printandsign";
// const containerClient = blobServiceClient.getContainerClient(containerName);

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only PNG and JPEG are allowed."));
//     }
//   },
// });

// const addBlog = async (req, res) => {
//   try {
//     const uploadFiles = upload.fields([
//       { name: "image1", maxCount: 1 },
//       { name: "image2", maxCount: 1 },
//       { name: "image3", maxCount: 1 },
//     ]);
//     await uploadFiles(req, res, async (err) => {
//       if (err) {
//         return res.status(400).send({ success: false, error: err.message });
//       }

//       const { title, tags, description, testimonial, reviewer, review } =
//         req.body;

//       const imageFiles = req.files;
//       let imageBlobNames = [];
//       let imageUrls = [];

//       if (imageFiles) {
//         for (let i = 0; i < imageFiles.length; i++) {
//           const ext = path.extname(imageFiles[i].originalname);
//           const imageBlobName = `${Date.now()}-${i}${ext}`;

//           const blockBlobClient =
//             containerClient.getBlockBlobClient(imageBlobName);

//           const uploadOptions = {
//             blobHTTPHeaders: {
//               contentType:
//                 imageFiles[i].mimetype === "image/png"
//                   ? "image/png"
//                   : "image/jpeg",
//             },
//           };

//           await blockBlobClient.upload(
//             imageFiles[i].buffer,
//             imageFiles[i].size,
//             uploadOptions
//           );

//           const imageUrl = blockBlobClient.url;
//           imageBlobNames.push(imageBlobName);
//           imageUrls.push(imageUrl);
//         }
//       }

//       const blog = new Blog({
//         title,
//         tags,
//         description,
//         testimonial,
//         reviewer,
//         review,
//         images: [imageUrls[0], imageUrls[1], imageUrls[2]] || "",
//       });

//       await blog.save();

//       res.status(201).send({ success: true, data: blog });
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// };

// const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find({});
//     res.status(200).send({ success: true, data: blogs });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// };

// export { addBlog, getBlogs };
