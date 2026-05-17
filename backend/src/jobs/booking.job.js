import cron from "node-cron"
import { Booking } from "../models/booking.model.js"
import sendEmail from "../utils/sendEmail.js"


cron.schedule("*/1 * * * *", async () => {

    try {

        const now = new Date()

        const expiredBookings =
            await Booking.updateMany(

                {
                    status: "pending",

                    paymentStatus: "pending",

                    expiresAt: {
                        $lt: now
                    }
                },

                {
                    $set: {
                        status: "cancelled"
                    }
                }
            )


    } catch (error) {

        console.log(
            "Cron Error:",
            error
        )
    }

})


cron.schedule("*/5 * * * *", async () => {

    try {

        const now = new Date()

        const completedBookings =
            await Booking.updateMany(

                {
                    status: "confirmed",

                    endTime: {
                        $lt: now
                    }
                },

                {
                    $set: {
                        status: "completed"
                    }
                }
            )


    } catch (error) {

        console.log(error)
    }

})

cron.schedule("*/5 * * * *", async () => {

    try {

        const now = new Date()

        const thirtyMinutesLater =
            new Date(
                Date.now() + 30 * 60 * 1000
            )

        const upcomingBookings =
            await Booking.find({

                status: "confirmed",

                reminderSent: false,

                startTime: {
                    $gte: now,
                    $lte: thirtyMinutesLater
                }

            })

        for (const booking of upcomingBookings) {

            const user =
                await User.findById(
                    booking.userId
                )

            const mentor =
                await User.findById(
                    booking.mentorId
                )

            await sendEmail({

                to: user.email,

                subject: "Session Reminder",

                html: `
                    <h2>
                        Your session starts soon
                    </h2>

                    <p>
                        Mentor:
                        ${mentor.name}
                    </p>

                    <p>
                        Start Time:
                        ${booking.startTime}
                    </p>

                    <a href="${booking.meetingLink}">
                        Join Meeting
                    </a>
                `
            })

            await sendEmail({

                to: mentor.email,

                subject: "Upcoming Mentorship Session",

                html: `
                    <h2>
                        Upcoming Session Reminder
                    </h2>

                    <p>
                        Your session starts in
                        less than 30 minutes.
                    </p>

                    <a href="${booking.meetingLink}">
                        Join Meeting
                    </a>
                `
            })
            booking.reminderSent = true

            await booking.save()
        }

        console.log(
            `Reminder emails sent: ${upcomingBookings.length}`
        )

    } catch (error) {

        console.log(
            "Reminder Cron Error:",
            error
        )
    }

})