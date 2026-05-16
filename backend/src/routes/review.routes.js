import { Router } from "express";
import {
    createReview,
    getMentorReviews
} from '../controllers/review.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { reviewLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,reviewLimiter,createReview)
router.route("/mentors/:mentorId").get(getMentorReviews)


export default router