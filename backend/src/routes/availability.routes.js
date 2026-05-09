import { Router } from "express";
import { 
    createAvailabilty,
    deleteAvailability,
    getAvailableSlots,
    getMentorAvailability,
    updateAvailability
 } from "../controllers/availability.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT,createAvailabilty)
router.route("/:mentorId").get(getMentorAvailability)
router.route("/:availabilityId").patch(verifyJWT,updateAvailability)
router.route("/:availabilityId").delete(verifyJWT,deleteAvailability)
router.route("/slots/:mentorId").get(verifyJWT,getAvailableSlots)

export default router