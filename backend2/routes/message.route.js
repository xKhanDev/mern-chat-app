import express from "express";
import sendMessage from "../controlleres/message.controllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router();

router.route("/send/:id").post(protectRoute,sendMessage);

export default router;