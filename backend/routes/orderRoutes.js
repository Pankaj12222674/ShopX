import express from "express"
import { createOrder, getAllOrder, getAdminOrders, getOrderById, updateOrderStatus } from "../controllers/order-controller.js"
import auth, { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/create',auth,createOrder)
router.post('/',auth,getAllOrder)
router.get('/admin', auth, protect, getAdminOrders)
router.patch('/:id/status', auth, protect, updateOrderStatus)
router.get('/:id', auth, getOrderById)

export default router