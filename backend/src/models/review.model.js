import mongoose,{Schema} from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mentorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"Booking",
        required:true,
        unique:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        trime:true,
        maxlength:500
    }
},
{ 
    timestamps:true 
})

export const Review = mongoose.model("Review",reviewSchema) 