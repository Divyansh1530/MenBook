import mongoose,{Schema} from "mongoose"

const paymentSchema = mongoose.Schema({
    mentorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending" , "paid" , "failed" , "refunded"],
        default:"pending"
    },
    provider:{
        type:String,
        enum:["razorpay"],
        default:"razorpay"
    },
    paymentId:{
        type:String,
        default:null
    },
    orderId:{
        type:String,
        default:null
    },
    signature:{
        type:String,
        default:null
    }
},
{
    timestamps:true
})

export const Payment = mongoose.model("Payment",paymentSchema)