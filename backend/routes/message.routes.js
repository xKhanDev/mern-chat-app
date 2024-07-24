import express from 'express'
import {sendMessage} from "../controllers/message.controllers.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();

router.route("/send/:id").post(protectRoute,sendMessage);

export default router;