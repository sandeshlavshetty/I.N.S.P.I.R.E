const express = require('express');
const app = express();
const passport = require('./config/passportConfig');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const userModel = require("./models/user");
const pollModel = require("./models/poll");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
require('dotenv').config();
const port = process.env.PORT || 3000;
//middlewares
// app.use(express.json());
// app.use(cors());

app.set('views', path.join(__dirname, 'views'));

// Session and Passport Middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/************************************** GOOGLE OAUTH **************************************/
/* PassportJS Docs Refer : https://www.passportjs.org/packages/passport-google-oauth20 */

// Setting up Google Stratergy for Passport.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    // verify callback [https://www.passportjs.org/packages/passport-google-oauth20/]
    async (accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await userModel.findOne({ googleId: profile.id });

            if (existingUser) {
                console.log("User already exists.", existingUser);
                return done(null, existingUser);
            }

            let newUser = new userModel({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                provider: 'google'
            });
            console.log("New user.", newUser);

            await newUser.save();
            console.log("Access Token: ", accessToken);
            return done(null, newUser);
        } catch (err) {
            return done(err, false);
        }
    }
));

/**
 * Serializes user information for session storage.
 */
passport.serializeUser((user, done) => {
    console.log("User ID = ", user.id);
    done(null, user.id);  // Store the user ID in the session
});

/**
 * Deserializes user information from the session.
 */
passport.deserializeUser(async (id, done) => {
    try {
        let user = await userModel.findById(id);  // Find user by ID when deserializing
        console.log("User deserialize.", user);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});

// Google OAuth Routes
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email',]
    }));

// Authentication callback
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
    (_req, res) => {
        res.redirect('/poll');
    }
);

/**
 * Middleware to ensure that a user is authenticated.
 *
 * This function checks if the user is authenticated. If the user is 
 * authenticated, it allows the request to proceed to the next middleware 
 * or route handler. If the user is not authenticated, they are redirected 
 * to the login page.
 *
 * @param {Object} req - The request object containing user information and session data.
 * @param {Object} res - The response object used to send responses to the client.
 * @param {function} next - The next middleware function in the stack.
*/
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        const { email, name } = req.user;
        console.log(`${name} is authenticated!. Email : ${email}`);
        return next();
    } else if (!req.isAuthenticated()) {
        if (req.cookies.token === "" || typeof req.cookies.token === 'undefined') res.redirect('/login');
        else {
            let data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            req.user = data;
            return next();
        }
    } else {
        res.redirect('/login');
    }
}

app.get("/", (req, res) => {
    if (req.cookies.token === "" || typeof req.cookies.token === 'undefined') res.render("index");
    else {
        res.status(200).redirect("/poll");
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log(email);
    console.log(password);
    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(500).send("Something went wrong");


    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email, userid: user._id, role: user.role }, process.env.JWT_KEY);
            res.cookie("token", token);
            if (user.role == "admin") {
                res.status(200).redirect("/admin");
            }
            else {
                res.status(200).redirect("/poll");
            }
        }
        else res.redirect("/login");
    })
});

app.get('/logout', (req, res, next) => {
    res.cookie("token", "");
    req.logout((err) => {
        if (err) { return next(); }
        res.redirect('/')
    })
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    let { email, password, btid, name } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                btid,
                name,
                email,
                password: hash,
                role: "student",
                approval: 0
            });
            let token = jwt.sign({ email: user.email, userid: user._id, role: user.role }, process.env.JWT_KEY);
            res.cookie("token", token);
            res.status(200).redirect("/poll");
        })
    })
});

app.get('/admin', ensureAuthenticated, async (req, res) => {
    const users = await userModel.find();
    if (req.user.role == "admin") {
        let latestPollEntry = await pollModel.findOne({ visibility: "1" }).exec();
        if (latestPollEntry) {
            res.render('admin', { user: users, poll_result: latestPollEntry });
        }
        else {
            res.render('admin', { user: users, poll_result: "" });
        }
    } else {
        res.redirect('/');
    }
});

app.get('/poll', ensureAuthenticated, async (req, res) => {
    let latestPollEntry = await pollModel.findOne({ visibility: "1" }).exec();

    if (latestPollEntry) {
        let user = await userModel.findOne({ email: req.user.email });
        if (user.approval == 1) {
            // console.log(user.chosen_option);
            if (user.chosen_option == "") {
                res.status(200).render("poll", { latestPollEntry, valid: 1, no_post: 0 });
                // console.log("first time vote");
            }
            else {
                res.status(200).redirect("/poll_token");
                // console.log("token visit vote");
            }
        }
        else {
            res.status(200).render("poll", { valid: 0, no_post: 0 });
        }
    }
    else if (!latestPollEntry) {
        let user = await userModel.findOne({ email: req.user.email });
        if (user.chosen_option != "") {
            res.status(200).redirect("/poll_token");
            // console.log("first time vote");
        }
        else {
            res.status(200).render("poll", { no_post: 1 });
        }
    }
    else {
        res.status(200).render("poll", { no_post: 1 });
    }
});

app.get("/poll_token", ensureAuthenticated, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).render('ticket', {
        option: user.chosen_option,
        time: user.d_optn,
        btid: user.btid
    });
});

app.post("/poll", ensureAuthenticated, async (req, res) => {
    const selectedOptionValue = req.body.pollOption;
    let latestPollEntry = await pollModel.findOne({ visibility: "1" });
    if (latestPollEntry) {
        const documentIdToUpdate = latestPollEntry._id;
        console.log("poll log");
        const now = new Date();
        storedDateTime = now.toLocaleDateString();
        user_email = req.user.email;

        if (selectedOptionValue == "option1") {
            try {
                const result = await pollModel.updateOne(
                    { _id: documentIdToUpdate },
                    { $inc: { option1: 1 } }
                ).exec();

                if (result) {
                    console.log('Document updated successfully:');
                } else {
                    console.log('No documents matched the query. Document not updated.');
                }
                const latestPollEntry = await pollModel.findById(documentIdToUpdate).exec();
                const user = await userModel.findOne({ email: user_email });
                // Update the user's chosen option and date option fields
                const userResult = await userModel.updateOne(
                    { email: user_email },
                    {
                        $set: {
                            chosen_option: latestPollEntry.option1_name,
                            d_optn: storedDateTime
                        }
                    }
                ).exec();

                res.status(200).render('ticket', {
                    option: latestPollEntry.option1_name,
                    time: storedDateTime,
                    btid: user.btid
                });
            } catch (err) {
                console.error('Error updating document:', err);
                res.status(500).send('Error updating poll.');
            }
        }
        else if (selectedOptionValue == "option2") {
            try {
                const result = await pollModel.updateOne(
                    { _id: documentIdToUpdate },
                    { $inc: { option2: 1 } }
                ).exec();

                if (result) {
                    console.log('Document updated successfully:');
                } else {
                    console.log('No documents matched the query. Document not updated.');
                }
                const latestPollEntry = await pollModel.findById(documentIdToUpdate).exec();
                const user = await userModel.findOne({ email: user_email });
                // Update the user's chosen option and date option fields
                const userResult = await userModel.updateOne(
                    { email: user_email },
                    {
                        $set: {
                            chosen_option: latestPollEntry.option2_name,
                            d_optn: storedDateTime
                        }
                    }
                ).exec();
                res.status(200).render('ticket', {
                    option: latestPollEntry.option2_name,
                    time: storedDateTime,
                    btid: user.btid
                });
            } catch (err) {
                console.error('Error updating document:', err);
                res.status(500).send('Error updating poll.');
            }
        }
        else if (selectedOptionValue == "option3") {
            try {
                const result = await pollModel.updateOne(
                    { _id: documentIdToUpdate },
                    { $inc: { option3: 1 } }
                ).exec();

                if (result) {
                    console.log('Document updated successfully:');
                } else {
                    console.log('No documents matched the query. Document not updated.');
                }
                const latestPollEntry = await pollModel.findById(documentIdToUpdate).exec();
                const user = await userModel.findOne({ email: user_email });
                // Update the user's chosen option and date option fields
                const userResult = await userModel.updateOne(
                    { email: user_email },
                    {
                        $set: {
                            chosen_option: latestPollEntry.option3_name,
                            d_optn: storedDateTime
                        }
                    }
                ).exec();

                res.status(200).render('ticket', {
                    option: latestPollEntry.option3_name,
                    time: storedDateTime,
                    btid: user.btid
                });
            } catch (err) {
                console.error('Error updating document:', err);
                res.status(500).send('Error updating poll.');
            }
        }
        else if (selectedOptionValue == "option4") {
            try {
                const result = await pollModel.updateOne(
                    { _id: documentIdToUpdate },
                    { $inc: { option4: 1 } }
                ).exec();

                if (result) {
                    console.log('Document updated successfully:');
                } else {
                    console.log('No documents matched the query. Document not updated.');
                }
                const latestPollEntry = await pollModel.findById(documentIdToUpdate).exec();
                const user = await userModel.findOne({ email: user_email });
                // Update the user's chosen option and date option fields
                const userResult = await userModel.updateOne(
                    { email: user_email },
                    {
                        $set: {
                            chosen_option: latestPollEntry.option4_name,
                            d_optn: storedDateTime
                        }
                    }
                ).exec();

                res.status(200).render('ticket', {
                    option: latestPollEntry.option4_name,
                    time: storedDateTime,
                    btid: user.btid
                });
            } catch (err) {
                console.error('Error updating document:', err);
                res.status(500).send('Error updating poll.');
            }
        }
        else if (selectedOptionValue == "option5") {
            try {
                const result = await pollModel.updateOne(
                    { _id: documentIdToUpdate },
                    { $inc: { option5: 1 } }
                ).exec();

                if (result) {
                    console.log('Document updated successfully:');
                } else {
                    console.log('No documents matched the query. Document not updated.');
                }
                const latestPollEntry = await pollModel.findById(documentIdToUpdate).exec();
                const user = await userModel.findOne({ email: user_email });
                // Update the user's chosen option and date option fields
                const userResult = await userModel.updateOne(
                    { email: user_email },
                    {
                        $set: {
                            chosen_option: latestPollEntry.option5_name,
                            d_optn: storedDateTime
                        }
                    }
                ).exec();
                res.status(200).render('ticket', {
                    option: latestPollEntry.option5_name,
                    time: storedDateTime,
                    btid: user.btid
                });
            } catch (err) {
                console.error('Error updating document:', err);
                res.status(500).send('Error updating poll.');
            }
        }
        else {
            console.error('Error updating document in poll submission:', err);
            res.status(400).redirect('/poll');
        }
    }
    else {
        res.status(400).redirect('/poll');
    }

});

app.post('/create_poll', ensureAuthenticated, async (req, res) => {
    console.log("/create_poll entered");
    let { p_describe, option1_name, option2_name, option3_name, option4_name, option5_name
    } = req.body;

    let poll = await pollModel.create({
        p_describe, visibility: 1, option1_name, option2_name, option3_name, option4_name, option5_name,
        option1: 0, option2: 0, option3: 0, option4: 0, option5: 0
    });
    console.log('New poll created:', poll);

    // Update all users' chosen_option and d_optn fields
    try {
        const updateResult = await userModel.updateMany(
            {}, // Empty filter to match all documents
            {
                $set: {
                    chosen_option: "",
                    d_optn: ""
                }
            }
        ).exec();

        console.log(`${updateResult.matchedCount} user documents matched the filter, updated ${updateResult.modifiedCount} documents.`);
    } catch (err) {
        console.error('Error updating user documents:', err);
    }


    res.status(200).redirect("/admin");
});


// app.get('/stop_poll', ensureAuthenticated, async (req, res) => {
//     try {
//         // Find the latest poll entry
//         let latestPollEntry = await pollModel.findOne({ visibility: "1" });

//         if (latestPollEntry) {
//             const documentIdToUpdate = latestPollEntry._id;

//             // Update the visibility field
//             const result = await pollModel.updateOne(
//                 { _id: documentIdToUpdate },
//                 { $set: { visibility: '0' } }
//             ).exec();

//             if (result > 0) {
//                 console.log('Document updated successfully:', result);
//             } else {
//                 console.log('No documents matched the query. Document not updated.');
//             }
//                 } else {
//             console.log('No poll entries found.');
//         }

//         res.status(200).redirect('/admin');

//     } catch (err) {
//         console.error('Error updating document:', err);
//         res.status(500).send('Error stopping poll.');
//     }
// });

app.get('/stop_poll', ensureAuthenticated, async (req, res) => {
    try {
        // Find the latest poll entry
        let latestPollEntry = await pollModel.findOne({ visibility: "1" });

        if (latestPollEntry) {
            const documentIdToUpdate = latestPollEntry._id;

            // Update the visibility field
            const result = await pollModel.updateOne(
                { _id: documentIdToUpdate },
                { $set: { visibility: '0' } }
            ).exec();

            if (result.modifiedCount > 0) {
                console.log('Document updated successfully:', result);
            } else {
                console.log('No documents matched the query. Document not updated.');
            }
        } else {
            console.log('No poll entries found.');
        }

        // Redirect to the poll results page and pass the poll data
        res.render("poll_results", {
            poll_result: latestPollEntry ? 1 : 0,
            op1_n: latestPollEntry ? latestPollEntry.option1_name : null,
            op2_n: latestPollEntry ? latestPollEntry.option2_name : null,
            op3_n: latestPollEntry ? latestPollEntry.option3_name : null,
            op4_n: latestPollEntry ? latestPollEntry.option4_name : null,
            op5_n: latestPollEntry ? latestPollEntry.option5_name : null,
            op1: latestPollEntry ? latestPollEntry.option1 : 0,
            op2: latestPollEntry ? latestPollEntry.option2 : 0,
            op3: latestPollEntry ? latestPollEntry.option3 : 0,
            op4: latestPollEntry ? latestPollEntry.option4 : 0,
            op5: latestPollEntry ? latestPollEntry.option5 : 0
        });
    } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).send('Error stopping poll.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
