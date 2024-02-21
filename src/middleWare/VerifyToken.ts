import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
import process from "process";
const jwt=require('jsonwebtoken')

export  const authenticate= async (req:any,res:any,next:any)=>{

    const authToken=req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({success:false,message:"No token authorization denied"})
    }

    try {
        const token=authToken.split(" ")[1]
        const decodedData=jwt.verify(token,process.env.JWT_SERCET_KEY)
       req.userId=decodedData.id
        req.role=decodedData.role
        next()
    }catch (error){
        res.status(500).json({success:false,message:"Internal server error"})
    }

}

export const restrict= (roles: unknown[]) => async (req:any,res:any,next:any)=>{
    const  userId=req.userId

    let user;

    const  patient=await UserSchema.findById(userId)
    const  doctor=await DoctorSchema.findById(userId)

    if(patient){
        user=patient
    }
    if (doctor){
        user=doctor
    }

    // @ts-ignore
    if(!roles.includes(user.role)){
        return res.status(401).json({success:false,message:"You are not authorized"})
    }

    next()
}