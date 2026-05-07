import mongoose,{Schema} from "mongoose";

const availabilitySchema = new Schema(
    {
        mentorId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        dayOfWeek:{
            type:Number,
            min:0,
            max:6
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
        slotDuration:{
            type:Number,
            required:true
        },
        bufferTime:{
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