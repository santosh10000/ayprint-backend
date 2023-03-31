require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/sendmail", upload.single("attachment"), (req, res) => {
  const {
    user_name,
    user_lname,
    business_name,
    address,
    email,
    phone,
    message,
  } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TO_EMAIL,
    subject: "New Inquiry from Contact Form",
    html: `
      <h3>New inquiry from contact form:</h3>
      <p>Name: ${user_name}</p>
      <p>Name: ${user_lname}</p>
      <p>Name: ${business_name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Phone: ${address}</p>
    
      <p>Message: ${message}</p>
    `,
    attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
