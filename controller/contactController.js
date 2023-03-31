import Contact from "../models/Contacts.js";
export const addContact = async (req, res) => {
  try {
    console.log(req.body);
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
