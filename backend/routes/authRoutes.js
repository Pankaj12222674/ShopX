import express from "express"
import { registerUser, loginUser, getProfile, getCustomers, updateProfile, forgotPassword, resetPassword} from "../controllers/authController.js"
import auth, { protect } from "../middleware/authMiddleware.js"
import { upload } from "../config/cloudinary.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/profile',auth, getProfile)
router.get('/customers', auth, protect, getCustomers)
router.put('/profile', auth, upload.single("profileImage"), updateProfile)


export default router