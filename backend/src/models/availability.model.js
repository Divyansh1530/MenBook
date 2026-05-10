import mongoose,{Schema} from "mongoose";

const availabilitySchema = new Schema(
    {
        mentorId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        date:{
            type:Date
        },
        startTime:{
            type:Number,
            required:true
        },
        endTime:{
            type:Number,
            required:true
        },
        isBlocked:{
            type:Boolean,
            default:false
        }

    },
    {
        timestamps:true
    }
)

export const Availability = mongoose.model("Availability",availabilitySchema)