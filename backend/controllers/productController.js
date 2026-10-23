import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { uploadImage } from "../config/cloudinary.js";

export const createProduct =async(req , res)=>{
    try {

        const {name,description,price,stock,category} = req.body;

        const result = await uploadImage(req)

        if(!name || !description || price === undefined || stock === undefined || !category){
            return res.status(400).json({
                message:"Need to all Section",
                success:false
            })
        }

        const categoryFind = await Category.findById(category)

        if(!categoryFind){
            return res.status(404).json({
                message:"Category Not found",
                success:false
            })
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image :result.secure_url,
            stock,
            category:categoryFind._id,

        })
        await newProduct.save()

        res.status(201).json({
            message:"Product created Successfully",
            success:true,
            newProduct
        })
        
    } catch (error) {
        
        res.status(500).json({
            message:"Product not created",
            success:false
        })
    }
}

export const fetchAllProduct = async(req,res)=>{

    try {
        const allProdut = await Product.find()
            .populate("category", "name")
            .sort({createdAt:-1})

        if(allProdut.length <=0 ){
            return res.status(404).json({
                message:"Empty product",
                success:false
            })
        }

        res.status(200).json({
            message:"Products fetched successfully ",
            success:true,
            products:allProdut
        })

    } catch (error) {
        
        res.status(500).json({
            message:"Product fetched failed",
            success:false,
        })
    }
}

export const fetchProductById = async(req,res)=>{

    try {

        const {id} = req.params

        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                message:"Product not found",
                success:false
            })
        }
        
        res.status(200).json({
            message:"Product Fetch Successfully",
            success:true,
            product:product
        })
    } catch (error) {

        res.status(500).json({
            message:"Failed to fetch product",
            success:false
        })
        
    }
}

export const updateProduct = async(req,res)=>{

    try {

        const {id} = req.params

        const updateProduct = await Product.findByIdAndUpdate(id,req.body,{
            new: true, runValidators: true
        })

        if(!updateProduct){
            return res.status(404).json({
                message:"Product not found",
                success:false
            })
        }

        
        
        res.status(200).json({
            message:"Product Fetch Successfully",
            success:true,
            product:updateProduct
        })
    } catch (error) {

        res.status(500).json({
            message:"Failed to fetch updateProduct",
            success:false
        })
        
    }
}