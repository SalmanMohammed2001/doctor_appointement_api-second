import express from "express";
import {createReview, getAllReview} from "../controller/ReviewController";
import {authenticate, restrict} from "../middleWare/VerifyToken";

const router=express.Router({mergeParams:true})



// /doctor/doctorId/reviews
router.route("/").get(getAllReview).post(authenticate,restrict(["patient"]),createReview)

export default router