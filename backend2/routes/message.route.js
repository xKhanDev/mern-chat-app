import express from "express";
import {sendMessage,getMessage} from "../controlleres/message.controllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router();

router.route("/:id").get(protectRoute,getMessage);
router.route("/send/:id").post(protectRoute,sendMessage);

export default router;