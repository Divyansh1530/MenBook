import { Router } from "express";
import{
    createBooking,
    getMentorBookings,
    getUserBookings
} from "../controllers/booking.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT , createBooking)
router.route("/user-bookings").get(verifyJWT,getUserBookings)
router.route("/mentor-bookings").get(verifyJWT,getMentorBookings)


export default router   