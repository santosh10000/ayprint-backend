import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.route("/addUser").post(registerUser);
userRoutes.route("/auth").post(loginUser);

export { userRoutes };
