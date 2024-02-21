

import User  from "../models/UserSchema";
import Doctor from "../models/DoctorSchema"
import process from "process";
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const generateToken=(user:any)=>{
   return jwt.sign({id:user._id,role:user.role,email:user.email},process.env.JWT_SERCET_KEY,{
   expiresIn:"15d",
  })
}

 export const register=async (req:any,res:any)=>{
   console.log(req.body)



  const{email,password,name,role,photo,gender}=req.body

  try{
   let user=null;

   if(role==="patient"){
    user= await User.findOne({email: email})
   }

   if(role==="doctor"){
    user= await  Doctor.findOne({email: email})
   }
    //check if user exist
   if(user){
    res.status(400).json({message:"User Already exist"})
   }

   //has password
   const salt = await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(password,salt)

   if(role==="patient"){
    user=new User({
     name,
     email,
     password:hashPassword,
     photo,
     gender,
     role
    })
   }
   if(role==="doctor"){
    console.log('salman')
    user=new Doctor({
     name,
     email,
     password:hashPassword,
     photo,
     gender,
     role
    })
   }

   // @ts-ignore
    await user.save()

    res.status(200).json({success:true,message:"User Successfully created"})



  }catch (error){
   res.status(500).json({success:false,message:"Internal server error"})
  }



 }


 export const login=async (req:any,res:any)=>{

  console.log(req.body.password)
 const{email,password}=req.body
  console.log(email)

  try {
  let user=null
 const patient= await  User.findOne({email: email})
 const doctor=  await  Doctor.findOne({email: email})

   if (patient){
      user=patient;
   }else if(doctor){
    user=doctor
   }

   if(!user){
    res.status(404).json({message:"user not found"})
   }

   // @ts-ignore
   const isPassword=await bcrypt.compare(req.body.password,user.password)

   if(!isPassword){
    res.status(400).json({status:false,message:"invalid credentials"})
   }

   const token=generateToken(user)


   // @ts-ignore
   const{password,role,appointments,...rest}=user._doc


    res.setHeader("Authorization",`Bearer ${token}`)
    res.status(200).json({status:true,message:"Successful login",token,data:rest,role})



    //res.status(200).json({message:"succes",token:token,data:user})


  }catch (error){
   res.status(500).json({success:false,message:"Internal server error"})
  }

 }