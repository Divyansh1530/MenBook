import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/review.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createReview = asyncHandler(async(req,res) => {

    const {mentorId , bookingId , rating , comment} = req.body

    const userId = req.user._id

    if (req.user.role !== "user") {
        throw new ApiError(403,"Only Users can create reviews")
    }

    if (!mentorId || !bookingId || !rating) {
        throw new ApiError(400,"All Fields are required")
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        throw new ApiError(400,"Invalid Mentor Id")
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new ApiError(400,"Invalid Booking Id")
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(400,"Rating must lie between 1 and 5")
    }

    const booking = await Booking.findById(
        bookingId
    )

    if (!booking) {
        throw new ApiError(404,"Booking not found")
    }

    if (booking.userId.toString() !== userId.toString()) {
        throw new ApiError(403,"You are not allowed to review this booking")
    }

    if (booking.status !== "completed") {
        throw new ApiError(400,"Only completed sessions can be reviewed")
    }

    const existingReview = await Review.findOne({
        bookingId
    })

    if (existingReview) {
        throw new ApiError(409,"Review already submitted")
    }

    const review = await Review.create({
        userId,
        mentorId,
        bookingId,
        rating,
        comment
    })

    const mentorReviews = await Review.find({
        mentorId
    })

    const totalReviews = mentorReviews.length

    const totalRating = mentorReviews.reduce(
        (acc,item)=>acc+item.rating,0
    )

    const avgRating = totalRating/totalReviews

    await User.findByIdAndUpdate(
        mentorId,
        {
            $set:{
                "mentorProfile.avgRating":avgRating.toFixed(1),
                "mentorProfile.totalReviews":totalReviews
            }
        }
    )
    return res
    .status(201)
    .json(
        new ApiResponse(201,review,"Review created successfully")
    )

})

const getMentorReviews = asyncHandler(async(req,res) => {

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

    const reviews = await Review.find({
        mentorId
    })
    .populate({
        path:"userId",
        select:"name avatar"
    })
    .sort({
        createdAt:-1
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200,reviews,"Mentor reviews fetched successfully")
    )

})

export {
    createReview,
    getMentorReviews
}