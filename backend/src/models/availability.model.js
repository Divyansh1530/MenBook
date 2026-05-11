import mongoose,{Schema} from "mongoose";

const availabilitySchema = new Schema(
    {
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
        isBlocked:{
            type:Boolean,
            default:false
        },
        bufferTime:{
            type:Number,
            required:true,
            default:0
        },
        slotDuration:{
            type:Number,
            required:true,
            default:30
        },
        dayOfWeek:{
            type:Number,
            required:true,
            min:0,
            max:6
        }

    },
    {
        timestamps:true
    }
)

export const Availability = mongoose.model("Availability",availabilitySchema)