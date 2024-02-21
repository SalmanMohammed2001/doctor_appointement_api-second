import express from "express";
import {
    deleteUser,
    getAllUser,
    getMyAppointment,
    getSingleUser,
    getUserProfile,
    updateUser
} from "../controller/UserController";
import {authenticate, restrict} from "../middleWare/VerifyToken";


const router=express.Router()

router.get("/find/:id",authenticate,restrict(["patient"]),getSingleUser)
router.get("/findAll",authenticate,restrict(["patient"]),getAllUser)
router.put("/update/:id",authenticate,restrict(["patient"]),updateUser)
router.delete("/delete/:id",authenticate,restrict(["patient"]),deleteUser)
router.get("/profile/me",authenticate,restrict(["patient"]),getUserProfile)
router.get("/appointment/my-appointment",authenticate,restrict(["patient"]),getMyAppointment)

//module.exports=router
export default router