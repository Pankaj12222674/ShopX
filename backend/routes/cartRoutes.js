
import express from "express"
import { addToCart,getCart,removeCart} from "../controllers/cartController.js"
import auth from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/',auth,addToCart)
router.get('/',auth,getCart)
router.post('/remove',auth,removeCart)

export default router