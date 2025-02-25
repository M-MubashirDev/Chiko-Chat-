import express from "express";
import { signup, login, GetUsers } from "../controllers/Users.controller.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);

//get all users
router.get("/getAllUsers", GetUsers);

// Login Route
router.post("/login", login);

export default router;
