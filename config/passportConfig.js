const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (_accessToken, _refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ email });
        if (user) {
            return done(null, user);
        } else {
            // If user is not found, create a new user
            const newUser = new userModel({
                email,
                name: profile.displayName,
                googleId: profile.id
            });
            await newUser.save();
            return done(null, newUser);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


module.exports = passport;
