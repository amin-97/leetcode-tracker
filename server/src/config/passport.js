import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails?.[0]?.value;

        if (email) {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.avatar = profile.photos?.[0]?.value;
            await user.save();
            return done(null, user);
          }
        }

        user = await User.create({
          googleId: profile.id,
          email: email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

export default passport;
