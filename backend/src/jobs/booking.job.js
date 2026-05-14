import cron from "node-cron"
import { Booking } from "../models/booking.model.js"
import sendEmail from "../utils/sendEmail.js"

/*
    CANCEL EXPIRED BOOKINGS
*/

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

/*
    AUTO COMPLETE BOOKINGS
*/

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

        /*
            CURRENT TIME
        */

        const now = new Date()

        /*
            30 MINUTES LATER
        */

        const thirtyMinutesLater =
            new Date(
                Date.now() + 2 * 60 * 1000
            )

        /*
            FIND BOOKINGS
        */

        const upcomingBookings =
            await Booking.find({

                status: "confirmed",

                reminderSent: false,

                startTime: {
                    $gte: now,
                    $lte: thirtyMinutesLater
                }

            })

        /*
            LOOP BOOKINGS
        */

        for (const booking of upcomingBookings) {

            /*
                GET USER + MENTOR
            */

            const user =
                await User.findById(
                    booking.userId
                )

            const mentor =
                await User.findById(
                    booking.mentorId
                )

            /*
                SEND EMAIL TO USER
            */

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

            /*
                SEND EMAIL TO MENTOR
            */

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

            /*
                PREVENT DUPLICATES
            */

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