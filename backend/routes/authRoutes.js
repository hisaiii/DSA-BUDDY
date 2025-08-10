import express from 'express'
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
import { tempResetPassword } from "../controllers/authController.js";



const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect,getUserInfo)
router.get("/temp-reset-password", tempResetPassword);



export default router 
