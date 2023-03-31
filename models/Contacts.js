import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_lname: {
    type: String,
    required: false,
  },
  business_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
