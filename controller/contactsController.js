import Contact from "../models/Contacts.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const addContacts = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file); // Log the uploaded file details

    const {
      user_name,
      user_lname,
      business_name,
      email,
      phone,
      address,
      message,
    } = req.body;

    const newContact = new Contact({
      user_name,
      user_lname,
      business_name,
      email,
      phone,
      address,
      message,
    });

    const savedContact = await newContact.save();

    res
      .status(200)
      .json({ success: true, data: savedContact, msg: `hello word` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addContactWithFile = [upload.single("file"), addContacts];
