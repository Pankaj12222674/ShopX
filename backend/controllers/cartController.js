
import Cart from "../models/Cart.js";
import Product from '../models/Product.js'

export const addToCart = async(req ,res)=>{

    try {
        const {productId ,quantity=1} = req.body
        const userId = req.user.id

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                message:"Product not Found",
                success:false
            })
        }

        let cartItem = await Cart.findOne({userId,productId})

        const newQuantity = cartItem ? cartItem.quantity + Number(quantity) : Number(quantity)

        if(newQuantity> product.stock){
            return res.status(400).json({
                message:"Product not in stock",
                success:false
            })
        }
        if(cartItem){
            cartItem.quantity = newQuantity;
            await cartItem.save()
        }
        else{
            cartItem = await Cart.create({
                userId,
                productId,
                quantity:Number(quantity)
            })

        }

        res.status(201).json({
            message:"Product added to cart",
            success:true,
            cartItem
        })
    } catch (error) {
        res.status(500).json({
            message:"failed to added cart",
            success:false
        })
    }
}

export const getCart = async(req,res)=>{
    try {
        const cartItems = await Cart.find({userId:req.user.id}).populate('productId')

        res.status(200).json({
            message:"Cart fetch Successfully",
            success:true,
            cartItems
        })
    } catch (error) {

        res.status(500).json({
            message:"Failed to load cart items",
            success:false
        })
        
    }
}

export const removeCart = async(req,res)=>{
    try {

        const {productId,quantity } = req.body
        const userId = req.user.id

        let cartItem = await Cart.findOne({userId,productId})
        let removeQuantity = Number(quantity)

        if(!Number.isInteger(removeQuantity) || removeQuantity < 1){
            return res.status(400).json({
                message:"Remove quantity should be  greater than one and Integer",
                success:false
            })
        }

        if(!cartItem){
            return res.status(404).json({
                message:"Cart not found",
                success:false
            })
        }

        if(removeQuantity === cartItem.quantity){
            await Cart.deleteOne({_id:cartItem._id})

            return res.status(200).json({
                message:"Remove cart successfully",
                success:true
            })
        }

        cartItem.quantity = cartItem.quantity - removeQuantity
        await cartItem.save()
        res.status(200).json({
            message:"Product remove(update) successfully",
            success:true,
            cartItem
        })


    } catch (error) {

        res.status(500).json({
            message:"Failed to remove",
            success:false
        })
        
    }
}