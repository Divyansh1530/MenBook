import { Router } from "express";
import { 
    createAvailabilty,
    deleteAvailability,
    getAvailableSlots,
    getMentorAvailability,
    updateAvailability,
    getCurrentMentorAvailability
 } from "../controllers/availability.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,createAvailabilty)
router.route("/mentor").get(verifyJWT,getCurrentMentorAvailability)
router.route("/:mentorId").get(getMentorAvailability)
router.route("/:availabilityId").patch(verifyJWT,updateAvailability)
router.route("/:availabilityId").delete(verifyJWT,deleteAvailability)
router.route("/slots/:mentorId").get(verifyJWT,getAvailableSlots)

export default router