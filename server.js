require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.urlencoded());

mongoose.set("strictQuery", false);

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// };

app.route("/home").get((req, res) => {
    // res.send("Good");
    res.json([
        {
            key: 1,
            title: "Delegation",
            content:
                "Q. How many programmers does it take to change a light bulb? A. None - It's a hardware problem",
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
});

// app.route("/:user/notes").get((req, res) => {
//     res.json([
//         {
//             key: 1,
//             title: "Delegation",
//             content:
//                 "Q. How many programmers does it take to change a light bulb? A. None - It's a hardware problem",
//         },
//     ]);
// });

// connectDB().then(() => {
// });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log("listening for requests");
});
