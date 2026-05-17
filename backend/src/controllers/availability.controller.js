import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Availability } from '../models/availability.model.js'
import mongoose from "mongoose"
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";
import generateSlots from "../utils/generateSlots.js";

const createAvailabilty = asyncHandler(async (req, res) => {

    const {
        dayOfWeek,
        startTime,
        endTime,
        slotDuration,
        bufferTime = 0
    } = req.body

    const mentorId = req.user._id

    if (req.user.role !== "mentor") {
        throw new ApiError(
            403,
            "Only mentors can create availability"
        )
    }

    if (
        dayOfWeek === undefined ||
        startTime === undefined ||
        endTime === undefined ||
        slotDuration === undefined
    ) {
        throw new ApiError(
            400,
            "Required fields are missing"
        )
    }

    if (
        !mongoose.Types.ObjectId.isValid(mentorId)
    ) {
        throw new ApiError(
            400,
            "Invalid mentor ID"
        )
    }

    const parsedStartTime = Number(startTime)

    const parsedEndTime = Number(endTime)

    const parsedSlotDuration = Number(slotDuration)

    const parsedBufferTime = Number(bufferTime)

    if (parsedStartTime >= parsedEndTime) {
        throw new ApiError(
            400,
            "Start time must be less than end time"
        )
    }

    if (parsedSlotDuration <= 0) {
        throw new ApiError(
            400,
            "Slot duration must be greater than 0"
        )
    }
        const totalWindow =

            parsedEndTime -
            parsedStartTime

        if (
            parsedSlotDuration >
            totalWindow
        ) {

            throw new ApiError(

                400,

                "Slot duration exceeds availability window"
            )
        }
        if (
            parsedStartTime < 0 ||
            parsedEndTime > 1440
        ) {

            throw new ApiError(

                400,

                "Invalid time range"
            )
        }

    if (parsedBufferTime < 0) {
        throw new ApiError(
            400,
            "Buffer time cannot be negative"
        )
    }

        const overlappingAvailability =
            await Availability.findOne({

                mentorId,

                dayOfWeek,

                startTime: {
                    $lt: parsedEndTime
                },

                endTime: {
                    $gt: parsedStartTime
                }
            })

        if (overlappingAvailability) {

            throw new ApiError(

                409,

                "Availability window overlaps with existing schedule"
            )
        }

    const availability =
        await Availability.create({

            mentorId,

            dayOfWeek,

            startTime: parsedStartTime,

            endTime: parsedEndTime,

            slotDuration: parsedSlotDuration,

            bufferTime: parsedBufferTime,

            isBlocked: false
        })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                availability,
                "Availability created successfully"
            )
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

const getAvailableSlots = asyncHandler(async(req,res) => {

    const {mentorId} = req.params

    const {date} = req.query 

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        throw new ApiError(400,"Invalid Mentor Id")
    }

    if (!date) {
        throw new ApiError(400,"Date is required")
    }

    const selectedDate = new Date(date)

    if (isNaN(selectedDate.getTime())) {
        throw new ApiError(400,"Invalid Date Format")
    }

    const dayOfWeek = selectedDate.getDay()

    const availability = await Availability.findOne({
        mentorId,
        dayOfWeek,
        isBlocked:false
    })

    if (!availability) {
        return res
        .status(200)
        .json(
            new ApiResponse(200,[],"No Availability found for this date")
        )
    }

    const generatedSlots = generateSlots({
        startTime:availability.startTime,
        endTime:availability.endTime,
        slotDuration:availability.slotDuration,
        bufferTime:availability.bufferTime
    })

    const startOfDay = new Date(selectedDate)
    startOfDay.setHours(0,0,0,0)

    const endOfDay = new Date(selectedDate)
    endOfDay.setHours(23,59,59,999)

    const existingBookings = await Booking.find({
        mentorId,
        startTime:{
            $gte:startOfDay,
            $lte:endOfDay
        },
        status:{
            $ne:"cancelled"
        }
    })

    const availableSlots = generatedSlots.filter((slot) => {
        const slotAlreadyBooked = existingBookings.some((booking) => {
            const bookingDate = new Date(booking.startTime)

            const bookingStartMinutes = bookingDate.getHours() * 60 + bookingDate.getMinutes()

            return bookingStartMinutes === slot.startTime
        })
        
        return !slotAlreadyBooked
    })

    const formattedSlots = availableSlots.map((slot) => {

   const startHour = Math.floor(slot.startTime / 60)
   const startMinute = slot.startTime % 60

   const endHour = Math.floor(slot.endTime / 60)
   const endMinute = slot.endTime % 60

   const startDate = new Date(selectedDate)
   startDate.setHours(startHour, startMinute, 0, 0)

   const endDate = new Date(selectedDate)
   endDate.setHours(endHour, endMinute, 0, 0)

   return {
      formattedStartTime: startDate.toLocaleTimeString([], {
         hour: '2-digit',
         minute: '2-digit'
      }),

      startTimeISO: startDate.toISOString(),

      endTimeISO: endDate.toISOString()
   }

})

    return res
    .status(200)
    .json(
        new ApiResponse(200,formattedSlots,"Available Slots fetched successfully")
    )

})

const getCurrentMentorAvailability = asyncHandler(async(req,res)=>{

   const availability =
   await Availability.find({

      mentorId: req.user._id

   })

   return res.status(200).json(

      new ApiResponse(

         200,

         availability,

         "Availability fetched successfully"
      )
   )
})

export {
    createAvailabilty,
    getMentorAvailability,
    updateAvailability,
    deleteAvailability,
    getAvailableSlots,
    getCurrentMentorAvailability
}
