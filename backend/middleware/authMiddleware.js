import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Token Invalid",
                success:false
            })
        }

        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode
        next()

    } catch (error) {

        res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }

}

export const protect = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(user.role !== 'admin' && user.role !== 'superadmin'){
            return res.status(403).json({
                message:"Not admin access",
                success:false
            })
        }
        req.userAccount = user
        return next()
    } catch (error) {

        res.status(500).json({
            message:"internal server found",
            success:false
        })

    }
}

export const superadminProtect = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(user.role !== 'superadmin'){
            return res.status(403).json({
                message:"Not super admin access",
                success:false
            })
        }
        req.userAccount = user
        return next()
    } catch (error) {

        res.status(500).json({
            message:"internal server found",
            success:false
        })

    }
}


export default auth