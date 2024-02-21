import express from "express";
import {login, register} from "../controller/AuthController";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)

module.exports=router