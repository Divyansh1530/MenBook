import {Router} from 'express'
import {
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateAccountDetails,
    getSingleMentor,
    getAllMentors,
    googleAuthCallback
} from '../controllers/auth.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import passport from 'passport'
import { authLimiter } from '../middlewares/rateLimit.middleware.js'

const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    authLimiter,
    registerUser
)
router.route("/login").post(authLimiter,loginUser)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-password").patch(verifyJWT,changeCurrentPassword)
router.route("/update-details").patch(verifyJWT,updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/mentors/:id").get(getSingleMentor)
router.route("/mentors").get(getAllMentors)
router.get("/auth/google",passport.authenticate(
    "google",
    {
        scope:["profile","email"]
    }
  )
)
router.get("/auth/google/callback",passport.authenticate(
    "google",
    {
        session:false
    }
  ),
   googleAuthCallback
)

export default router