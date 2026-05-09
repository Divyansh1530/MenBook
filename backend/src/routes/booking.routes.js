import { Router } from "express";
import{
    createBooking,
    getMentorBookings,
    getUserBookings,
    cancelBooking
} from "../controllers/booking.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT , createBooking)
router.route("/user-bookings").get(verifyJWT,getUserBookings)
router.route("/mentor-bookings").get(verifyJWT,getMentorBookings)
router.route("/:bookingId/cancel").patch(verifyJWT,cancelBooking)


export default router   