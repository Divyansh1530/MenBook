import { Router } from "express";
import {
    createReview,
    getMentorReviews
} from '../controllers/review.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,createReview)
router.route("/mentors/:mentorId").get(getMentorReviews)


export default router