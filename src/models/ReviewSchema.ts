import mongoose from "mongoose";
import DoctorSchema from "./DoctorSchema";

const reviewSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0,
        },
    },
    { timestamps: true }
);

reviewSchema.pre(/^find/,function (next) {

    // @ts-ignore
    this.populate({
        path:'user',
        select:"name photo",
    })

    next()
})

reviewSchema.statics.calcAverageRating=async  function (doctorId){
    
    const  stats= await this.aggregate([{
        $match:{doctor:doctorId}    
    },
        {
            $group:{
                _id:'$doctor',
                numOfRating:{$sum:1},
                avgRating:{$avg:'$rating'}
            }
        }
    ])

    console.log(stats)

    await DoctorSchema.findByIdAndUpdate(doctorId,{
        totalRating:stats[0].numOfRating,
        averageRating: stats[0].avgRating
    })
}

reviewSchema.post('save',function (){
    // @ts-ignore
    this.constructor.calcAverageRating(this.doctor)
});
export default mongoose.model("Review", reviewSchema);

