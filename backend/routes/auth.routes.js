import express from 'express';
import { signup, login, logout } from '../controllers/auth.controllers.js';

const router = express.Router();

// Authentication Routes
// signup route
router.route("/signup").post( signup);

// login route
router.route("/login").post( login);

// logout route
router.route("/logout").post( logout);

export default router;