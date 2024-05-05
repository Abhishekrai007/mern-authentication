const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
// console.log(process.env.CLIENT_URL)
dotenv.config();
mongoose.connect("mongodb+srv://abhishekrai1574:admin@cluster0.kf2fm6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json())
app.use(cookieParser())
const jwtSecret = process.env.JWT_SECRET;
const brcyptSalt = bcrypt.genSaltSync(10)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json({
                    id: foundUser._id,
                })
            })
        }
    }
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({ username, password: bcrypt.hashSync(password, brcyptSalt) })
        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).status(201).json({
                id: createdUser._id,
                username
            })
        })
    } catch (error) {
        if (error) throw error
        res.status(500).json("error")
    }
})

app.get("/profile", (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData)
        })
    } else {
        res.status(401).json("no token")
    }
})

app.listen(3000)

// mongodb+srv://abhishekrai1574:admin@cluster0.kf2fm6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0