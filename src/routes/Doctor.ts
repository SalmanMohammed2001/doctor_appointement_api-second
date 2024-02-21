import express from "express";

import {
    deleteDoctor,
    geDoctorProfile,
    getAllDoctor,
    getSingleDoctor,
    updateDoctor
} from "../controller/DoctorController";
import {authenticate, restrict} from "../middleWare/VerifyToken";

import reviewRoute from '../routes/Review'


const router=express.Router()

router.use("/:doctorId/reviews",reviewRoute)

router.get("/find/:id",getSingleDoctor)
router.get("/findAll",getAllDoctor)
router.put("/update/:id",authenticate,restrict(["doctor"]),updateDoctor)
router.delete("/delete/:id",authenticate,restrict(["doctor"]),deleteDoctor)

router.get("/profile/me",authenticate,restrict(["doctor"]),geDoctorProfile)

//module.exports=router
export default router