import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import authRouter from './routes/auth.routes.js'
import availabilityRouter from './routes/availability.routes.js'
import bookingRouter from './routes/booking.routes.js'

//routes declaration

app.use("/api/v1.1/users",authRouter)
app.use("/api/v1.1/availability",availabilityRouter)
app.use("/api/v1.1/booking",bookingRouter)


export {app}
