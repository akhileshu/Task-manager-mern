import express from "express";
import { checkToken, login, logout, register } from "../controller/auth.js";
import passport from "../config/passport.js";
const router = express.Router();

// url ->root/auth/
router
  .post("/register", register)
  .post("/login", login)
  .post("/logout", passport.authenticate("jwt", { session: false }), logout)
  .get('/checkUser',passport.authenticate("jwt", { session: false }),checkToken);
export default router;
