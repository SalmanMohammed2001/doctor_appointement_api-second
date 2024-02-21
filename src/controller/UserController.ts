
 import UserSchema from "../models/UserSchema";
 import userSchema from "../models/UserSchema";
 import BookingSchema from "../models/BookingSchema";
 import DoctorSchema from "../models/DoctorSchema";

 export  const updateUser=(req:any,res:any)=>{

     console.log(req.body)
  const id=req.params.id

    try{

        UserSchema.findByIdAndUpdate({'_id':id},{$set:req.body},{new:true}).then((result)=>{
            if(result){
                res.status(200).json({success:true,message:"Successfully updated",data:result})
            }else {
                res.status(500).json({status:false,message:'Try again update fail ' })
            }
        })


    }catch (error){
        res.status(500).json({success:false,message:"Internal server error"})
    }

}
 export  const deleteUser=(req:any,res:any)=>{

     const id=req.params.id

     try{

         UserSchema.findByIdAndDelete({'_id':id}).then((deleteUser)=>{
             if(deleteUser){
                 res.status(200).json({success:true,message:"Successfully delete",data:deleteUser})
             }else {
                 res.status(500).json({status:false,message:'Try again delete fail ' })
             }
         })


     }catch (error){
         res.status(500).json({success:false,message:"Internal server error"})
     }

 }

 export  const getSingleUser=(req:any,res:any)=>{

     const id=req.params.id

     try{

         UserSchema.findById({'_id':id}).select('-password').then((result)=>{
             if(result){
                 res.status(200).json({success:true,message:"Successfully get User",data:result})
             }else {
                 res.status(500).json({status:false,message:'Try again get fail ' })
             }
         })


     }catch (error){
         res.status(500).json({success:false,message:"Internal server error"})
     }

 }
 export  const getAllUser=(req:any,res:any)=>{

     const id=req.params.id

     try{

         UserSchema.find().select('-password').then((result)=>{
             if(result){
                 res.status(200).json({success:true,message:"Successfully getAll User",data:result})
             }else {
                 res.status(500).json({status:false,message:'Try again getAll fail ' })
             }
         })


     }catch (error){
         res.status(500).json({success:false,message:"Internal server error"})
     }

 }


 export const getUserProfile=async (req:any,res:any)=>{
     const userId=req.userId

     try{
        const  user= await userSchema.findById({'_id':userId});
        if(!user){
            res.status(404).json({status:false,message:'user not found ' })
        }

        // @ts-ignore
         const {password,...rest}=user._doc

         res.status(200).json({success:true,message:"profile info getting",data:{...rest}})
     }catch (error){
         res.status(500).json({success:false,message:"Internal server error"})
     }

 }

 export const  getMyAppointment=async (req:any,res:any)=>{

     try{

     //step 1 :retrieve   appointment from booking for specific  user
     const booking= await  BookingSchema.find({user:req.userId})

     //step 2 :retrieve   extract doctor from appointment booking
     // @ts-ignore
     const  doctorIds=  booking.map(el=>el.doctor.id)


     //step 3 :retrieve   doctors  using doctor ids
     const  doctors= await DoctorSchema.find({_id:{$in:doctorIds}}).select('-password')

     res.status(200).json({success:true,message:"Appointments are getting",data:doctors})

     }catch (error) {
         res.status(500).json({success: false, message: "Internal server error"})

     }
 }