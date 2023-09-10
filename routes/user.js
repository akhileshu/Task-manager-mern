import express from "express";
import { fetchUserById, updateUser } from "../controller/user.js";
const router = express.Router();
// url ->root/user/
router.get("/fetch/:id", fetchUserById).patch("/update/:id", updateUser);
export default router;
