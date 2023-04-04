import express from "express";

import {
  addContact,
  getContacts,
  deleteById,
} from "../controller/contactAdminController.js";

const contactRoutes = express.Router();

contactRoutes.route("/addContact").post(addContact);
contactRoutes.route("/").get(getContacts);
contactRoutes.route("/:id").delete(deleteById);

// router.get('/contacts', getContacts);

export default contactRoutes;
