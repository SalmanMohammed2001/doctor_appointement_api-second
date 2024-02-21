import userSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
import ReviewSchema from "../models/ReviewSchema";


export const getAllReview =async (req:any,res:any)=>{

    try {
     const review=   await ReviewSchema.find({})
        res.status(200).json({success:true,message:"Successfully",data:review})

    }catch (error){
        res.status(500).json({success:false,message:"not found"})
    }
}

export const createReview =async (req:any,res:any)=>{

    if(!req.body.doctor){
        req.body.doctor=req.params.doctorId
        console.log(req.body.doctor)
    }

    if(!req.body.user){
        req.body.user=req.userId
        console.log(req.body.user)
    }

    try{

        const newReview=new ReviewSchema(req.body)


        const saveReview=await newReview.save();

        await DoctorSchema.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews:saveReview._id}
        })

        res.status(200).json({success:true,message:"Review Submit",data:saveReview})


    }catch (error){
        res.status(500).json({success:false,message:"not found"})
    }
}
