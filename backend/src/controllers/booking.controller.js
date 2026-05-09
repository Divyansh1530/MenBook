import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";

const createBooking = asyncHandler(async(req,res) => {

    const {mentorId , startTime , endTime , amount} = req.body

    const userId = req.user._id

    if (req.user.role !== "user") {
        throw new ApiError(403,"Only Users can create bookings")
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        throw new ApiError(400,"Invalid Mentor ID")
    }

    if (!mentorId || !startTime || !endTime || !amount) {
        throw new ApiError(400,"All Fields are required")
    }

    const mentor = await User.findById(mentorId)

    if (!mentor) {
        throw new ApiError(404,"Mentor Not Found")
    }

    if (mentor.role !== "mentor") {
        throw new ApiError(400,"Selected User is not a mentor")
    }

    const parsedStartTime = new Date(startTime)
    const parsedEndTime = new Date(endTime)

    if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
        throw new ApiError(400,"Invalid Date Format")
    }

    if (parsedStartTime >= parsedEndTime) {
        throw new ApiError(400,"Start Time must be less than End Time")
    }

    const existingBooking = await Booking.findOne({
        mentorId,
        startTime:parsedStartTime,
        status:{
            $ne:"cancelled"
        }
    })

    if (existingBooking) {
        throw new ApiError(409,"Slot is already Booked")
    }

    const expiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    )

    const booking = await Booking.create({
        userId,
        mentorId,
        startTime:parsedStartTime,
        endTime:parsedEndTime,
        amount,
        status:"pending",
        paymentStatus:"pending",
        expiresAt
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201,booking,"Booking created successfully")
    )

})

export {
    createBooking
}