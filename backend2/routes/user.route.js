import express from 'express'

import protectRoute from '../middlewares/protectRoute.js';
import {getUserForSidebar} from "../controlleres/user.controllers.js"

const router = express.Router();

router.route("/").get(protectRoute, getUserForSidebar)

export default router;