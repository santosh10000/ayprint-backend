import express from "express";
import { addContact } from "../controller/contactController.js";
import { addContacts } from "../controller/contactsController.js";

const router = express.Router();

router.route("/addContact").post(addContact);
router.route("/addContacts").post(addContact);
// router.get('/contacts', getContacts);

export default router;
