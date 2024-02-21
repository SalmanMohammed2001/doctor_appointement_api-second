import mongoose from "mongoose";
import express from 'express'
import  process from "process";
import bodyParser from "body-parser";
import userRoute from './routes/User'
import doctorRoute from './routes/Doctor'
import reviewRoute from './routes/Review'

var cookieParser = require('cookie-parser')
const cors = require('cors')

const dotenv=require('dotenv')
dotenv.config({ path: 'src/.env' });

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 app.use(cors())
 app.use(cookieParser())


let port=process.env.SERVER || 8080

mongoose.connect('mongodb://127.0.0.1:27017/doctor_appointment').then(()=>{
    app.listen(port,()=>{
        console.log(`serve running ${port}`)

    })
})


const authRoute=require('./routes/Auth')


app.use("/api/v1/auth",authRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/doctors",doctorRoute)
app.use("/api/v1/review",reviewRoute)


