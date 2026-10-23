import express from "express"
import { createCategory,fetchCategory } from "../controllers/categoryController.js"
import { protect } from "../middleware/authMiddleware.js"
import auth from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/create',auth,protect,createCategory)
router.get('/',fetchCategory)



export default router