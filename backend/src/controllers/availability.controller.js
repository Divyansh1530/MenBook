import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Availability } from '../models/availability.model.js'
import mongoose from "mongoose"
import { User } from "../models/user.model.js";

const createAvailabilty = asyncHandler(async(req,res) => {
    
    const {dayOfWeek , startTime , endTime , slotDuration , bufferTime = 0} = req.body

    const mentorId = req.user._id

    if (req.user.role !== "mentor") {
        throw new ApiError(403, "Only mentors can create availability")
    }

      if (
         dayOfWeek === undefined ||
         startTime === undefined ||
         endTime === undefined ||
         slotDuration === undefined
         ) {
        throw new ApiError(400,"Required fields are missing")
    }

    if (!mentorId) {
        throw new ApiError(400,"Mentor ID is required")
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        throw new ApiError(400,"Invalid Mentor ID")
    }

    const parsedStartTime = Number(startTime)
    const parsedEndTime = Number(endTime)
    const parsedSlotDuration = Number(slotDuration)
    const parsedBufferTime = Number(bufferTime)

    if (parsedStartTime >= parsedEndTime) {
        throw new ApiError(400,"Start Time must be less than End Time")
    }

    if (parsedSlotDuration <= 0) {
        throw new ApiError(400,"Slot duration cannot be negative")
    }

    if (parsedBufferTime < 0) {
        throw new ApiError(400,"Buffer time cannot be negative") 
    }

    const createdAvailability = await Availability.create({
        dayOfWeek,
        startTime:parsedStartTime,
        endTime:parsedEndTime,
        slotDuration:parsedSlotDuration,
        bufferTime:parsedBufferTime,
        mentorId
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdAvailability , "Availability created successfully")
    )
    
})

const getMentorAvailability = asyncHandler(async(req,res)=> {

    const {mentorId} = req.params

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        throw new ApiError(400,"Invalid Mentor Id")
    }

    const mentor = await User.findById(mentorId)

    if (!mentor) {
        throw new ApiError(404,"Mentor Not Found")
    }

    if (mentor.role !== "mentor") {
        throw new ApiError(400,"User is not a mentor")
    }

    const availability = await Availability.find({
        mentorId
    })
    .sort({ dayOfWeek:1 })

    return res
    .status(200)
    .json(
        new ApiResponse(200,availability ,"Mentor Availability fetched successfully")
    )


})

const updateAvailability = asyncHandler(async(req,res)=> {

    const {availabilityId} = req.params

    if (!mongoose.Types.ObjectId.isValid(availabilityId)) {
        throw new ApiError(400,"Invalid Availability Id ")
    }

    const availability = await Availability.findById(availabilityId)

    if (!availability) {
        throw new ApiError(400,"Availability Not Found")
    }

    if (availability.mentorId.toString() !== req.user._id.toString()) {
        throw new ApiError(403,"You are not allowed to update the availability")
    }

    const {
        dayOfWeek,
        startTime,
        endTime,
        slotDuration,
        bufferTime,
        isBlocked
    } = req.body

    if (dayOfWeek !== undefined) {
        availability.dayOfWeek = dayOfWeek
    }

    if (startTime !== undefined) {
        availability.startTime = Number(startTime)
    }

    if (endTime !== undefined) {
        availability.endTime = Number(endTime)
    }

    if (slotDuration !== undefined) {
        availability.slotDuration = Number(slotDuration)
    }

    if (bufferTime !== undefined) {
        availability.bufferTime = Number(bufferTime)
    }

    if (isBlocked !== undefined) {
        availability.isBlocked = isBlocked
    }

    if (availability.startTime >= availability.endTime) {
        throw new ApiError(400,"Start time must be less than end time" )
    }

    if (availability.slotDuration <= 0) {
        throw new ApiError(400,"Slot duration must be greater than 0" )
    }

    if (availability.bufferTime < 0) {
        throw new ApiError(400,"Buffer time cannot be negative" )
    }

    await availability.save()

    return res.status(200).json(
        new ApiResponse(200,availability,"Availability updated successfully" )
    )

})

const deleteAvailability = asyncHandler(async(req,res) =>{

    const {availabilityId} = req.params

    if (!mongoose.Types.ObjectId.isValid(availabilityId)) {
        throw new ApiError(400,"Invalid Availability Id ")
    }

    const availability = await Availability.findById(availabilityId)

    if (!availability) {
        throw new ApiError(400,"Availability Not Found")
    }

    if (availability.mentorId.toString() !== req.user._id.toString()) {
        throw new ApiError(403,"You are not allowed to update the availability")
    }

    await availability.deleteOne()

    return res
    .status(200)
    .json(
        new ApiResponse(200 , null , "Availability Deleted Successfully")
    )


})

export {
    createAvailabilty,
    getMentorAvailability,
    updateAvailability,
    deleteAvailability
}
