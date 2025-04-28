import express from 'express';
import { registerUser,authUser } from '../controllers/userController.js';


const router = express.Router();

// Route for user registration

router.post('/register', registerUser);

// Route for user authentication

router.post('/login', authUser);

export default router;