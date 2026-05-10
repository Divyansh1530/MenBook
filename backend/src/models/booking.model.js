import mongoose ,{Schema} from "mongoose";

const bookingSchema = new mongoose.Schema({
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
    startTime:{
        type:Number,
        required:true
    },
    endTime:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid","cancelled"],
        default:"pending"
    },
    amount:{
        type:Number,
        required:true
    },
    meetingLink:{
        type:String,
        default:null
    },
    cancelReason:{
        type:String,
        default:null
    },
    expiresAt:{
        type:Date
    }

},
{
    timestamps:true
})

bookingSchema.index(
    { mentorId:1 , startTime:1 },
    { unique:true }
)

export const Booking = mongoose.model("Booking",bookingSchema)