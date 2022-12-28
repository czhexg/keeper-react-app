require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.set("trust proxy", 1);
app.use(
    session({
        secret: "session secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_SESSION_URI }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    notes: [noteSchema],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.route("/api/test").get((req, res) => {
    res.send("test");
});

app.route("/api/:user/notes").get((req, res) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0"
    );
    if (req.isAuthenticated()) {
        // console.log("get notes api");
        User.findOne({ username: req.params.user }, (err, foundUser) => {
            res.json(foundUser.notes);
        });
    } else {
        res.status(403).json("forbidden");
    }
});

app.route("/api/:user/notes/addnote").patch((req, res) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0"
    );
    if (req.isAuthenticated()) {
        if (JSON.stringify(req.body.newNote) !== "{}") {
            User.findOneAndUpdate(
                { username: req.params.user },
                { $push: { notes: req.body.newNote } },
                {
                    new: true,
                },
                (err, updatedNotes) => {
                    if (!err) {
                        res.json(updatedNotes.notes);
                    } else {
                        res.json(err);
                    }
                }
            );
        } else {
            // console.log("newNote empty");
            res.status(204).end();
        }
    } else {
        res.status(403).json("forbidden");
    }
});

app.route("/api/:user/notes/deletenote").patch((req, res) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0"
    );
    if (req.isAuthenticated()) {
        // console.log(JSON.stringify(req.body.noteID));
        if (JSON.stringify(req.body.noteID)) {
            // console.log(req.body.noteID);
            User.findOneAndUpdate(
                { username: req.params.user },
                { $pull: { notes: { _id: req.body.noteID } } },
                {
                    new: true,
                },
                (err, updatedNotes) => {
                    if (!err) {
                        // console.log(updatedNotes.notes);
                        res.json(updatedNotes.notes);
                    } else {
                        res.json(err);
                    }
                }
            );
        } else {
            // console.log("noteID empty");
            res.status(204).end();
        }
    } else {
        res.status(403).json("forbidden");
    }
});

app.route("/api/register").post((req, res) => {
    User.register(
        { username: req.body.username },
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.status(200).json("registered");
                });
            }
        }
    );
});

app.route("/api/login").post((req, res) => {
    passport.authenticate("local")(req, res, () => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.status(200).json("logged in");
            }
        });
    });
});

app.get("/api/logout", (req, res) => {
    req.logout((err) => {
        // console.log("logout");
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.status(200).json("logged out");
        }
    });
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log("listening for requests");
    });
});
