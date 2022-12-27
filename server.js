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
    key: Number,
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
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0"
    );
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.status(200).json([
            {
                key: 1,
                title: "Delegation",
                content:
                    "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem",
            },
            {
                key: 2,
                title: "Loops",
                content:
                    "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat.",
            },
            {
                key: 3,
                title: "Arrays",
                content:
                    "Q. Why did the programmer quit his job? A. Because he didn't get arrays.",
            },
            {
                key: 4,
                title: "Hardware vs. Software",
                content:
                    "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software.",
            },
        ]);
    } else {
        res.status(403).json("forbidden");
    }
});

app.route("/api/:user/notes").get((req, res) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0"
    );
    if (req.isAuthenticated()) {
        console.log(req.params.user);
        User.findOne({ username: req.params.user }, (err, foundUser) => {
            res.json(foundUser.notes);
        });
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
                res.json();
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
                res.json();
            } else {
                res.json();
            }
        });
    });
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            res.json();
        } else {
            res.json();
        }
    });
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log("listening for requests");
    });
});
