import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
import { Booking } from "../models/booking.model";
import razorpay from "../utils/razorpay";

const createOrder = asyncHandler(async(req,res) => {

    const {bookingId} = req.body

    const userId = req.user._id

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new ApiError(400,"Invalid Booking Id")
    }

    const booking = await Booking.findById(bookingId)

    if (!booking) {
        throw new ApiError(404,"Booking not found")
    }

    if (booking.userId.toString() !== userId.toString()) {
        throw new ApiError(403,"You are not allowed to pay for this booking")
    }

    if (booking.paymentStatus === "paid" ) {
        throw new ApiError(400,"Booking is already paid")
    }

    const amountInPaise = booking.amount * 100

    const order = await razorpay.orders.create({
        amount:amountInPaise,
        currency:"INR",
        receipt:`receipt_${booking._id}`
    })

    const payment = await Payment.create({
        mentorId:booking.mentorId,
        userId:booking.userId,
        bookingId:booking._id,
        amount:booking.amount,
        status:"pending",
        provider:"razorpay",
        orderId:order.id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201,{order,payment},"Razorpay order created successfully")
    )

})

export {
    createOrder
}