import express from "express"
import { login, logout, signup } from "../controlleres/auth.controllers.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;