import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"/api/v1.1/users/auth/google/callback"
        },
        async(
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            try {
                const email = profile.emails[0].value
                let user = await User.findOne({
                    email
                })

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.Id

                        await user.save()
                    }

                    return done(null,user)
                }

                user = await User.create({
                    name:profile.displayName,
                    email,
                    googleId:profile.id,
                    avatar:profile.photos[0].value,
                    role:"user"
                })

                return done(null,user)

            } catch (error) {
                return done(error,null)
            }
        }
    )
)

export default passport