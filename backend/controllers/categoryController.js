import Category from "../models/Category.js";

export const createCategory = async(req,res)=>{
    try {

        const {name} = req.body

        if(!name || !name.trim()){
            return res.status(400).json({
                message:"required to fill name"
            })
        }

        const categoryName = name.trim()

        const checkCategory = await Category.findOne({name:categoryName})

        if(checkCategory){
            return res.status(409).json({
                message:"Category alredy exist",
                success:false
            })
        }


        const newCategory = new Category({
            name:categoryName
        })
        await newCategory.save()

        res.status(201).json({
            message:"Category Created SuccessFully",
            success:true
            ,category:newCategory
        })
    } catch (error) {
        res.status(500).json({
            message:"Category Not created",
            success:false,
        })
    }
}

export const fetchCategory = async(req,res)=>{
    try {
        const categories = await Category.find().sort({ createdAt: -1 })
        res.json({
            categories
        })
    } catch (error) {
        
    }
}