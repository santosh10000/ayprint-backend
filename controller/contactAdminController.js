// import Contacts from "../models/Contacts.js";
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage }).single("attachment");

// const addContact = async (req, res) => {
//   try {
//     await upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).send({ success: false, error: err.message });
//       }

//       const {
//         user_name,
//         user_lname,
//         business_name,
//         email,
//         phone,
//         address,
//         message,
//       } = req.body;
//       const attachmentPath = req.file ? `${req.file.filename}` : "";
//       console.log(attachmentPath);
//       console.log(req.body);

//       const contact = new Contacts({
//         user_name,
//         user_lname,
//         business_name,
//         email,
//         phone,
//         address,
//         message,
//         attachment: attachmentPath,
//       });

//       await contact.save();

//       res.status(201).send({ success: true, data: contact });
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// };

// const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contacts.find({});

//     res.status(200).send({ success: true, data: contacts });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// };
// const deleteById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const contact = await Contacts.findByIdAndDelete(id);
//     if (!contact) {
//       return res
//         .status(404)
//         .send({ success: false, error: "Contact not found" });
//     }
//     res.status(200).send({ success: true, data: contact });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// };

// export { addContact, getContacts, deleteById };

import { BlobServiceClient } from "@azure/storage-blob";
import Contacts from "../models/Contacts.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
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
}).single("attachment");

const addContact = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err.message });
      }

      const {
        user_name,
        user_lname,
        business_name,
        email,
        phone,
        address,
        message,
      } = req.body;

      console.log(req.body);

      const attachment = req.file;
      let attachmentUrl = null;

      if (attachment) {
        const ext = path.extname(attachment.originalname);
        const imageBlobName = `${Date.now()}-${ext}`;

        const blockBlobClient =
          containerClient.getBlockBlobClient(imageBlobName);

        const uploadOptions = {
          blobHTTPHeaders: {
            contentType:
              attachment.mimetype === "image/png" ? "image/png" : "image/jpeg",
          },
        };

        await blockBlobClient.uploadData(
          attachment.buffer,
          attachment.size,
          uploadOptions
        );

        attachmentUrl = blockBlobClient.url;
      }

      const contact = new Contacts({
        user_name,
        user_lname,
        business_name,
        email,
        phone,
        address,
        message,
        attachment: attachmentUrl,
      });

      await contact.save();

      res.status(201).send({ success: true, data: contact });
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find({});

    res.status(200).send({ success: true, data: contacts });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contacts.findByIdAndDelete(id);
    if (!contact) {
      return res
        .status(404)
        .send({ success: false, error: "Contact not found" });
    }
    res.status(200).send({ success: true, data: contact });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

export { addContact, getContacts, deleteById };
