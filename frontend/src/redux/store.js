import {configureStore} from "@reduxjs/toolkit"
import authReducer from './features/authSlice'
import orderReducer from './features/orderSlice'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'
import customerReducer from './features/customerSlice'
import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'
import activityReducer from './features/activitySlice'
import statsReducer from './features/statsSlice'
import notificationReducer from './features/notificationSlice'
import supportReducer from './features/supportSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        order: orderReducer,
        product: productReducer,
        category: categoryReducer,
        customer: customerReducer,
        cart: cartReducer,
        superadminUsers: userReducer,
        activity: activityReducer,
        stats: statsReducer,
        notification: notificationReducer,
        support: supportReducer,
    }
})

export default store