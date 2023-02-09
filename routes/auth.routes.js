const router = require("express").Router();
// const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("./../midleware/jwt.middleware");

router.post("/signup", (req, res, next) => {
    const { email, password, username, profileImg, bio } = req.body;

    User.create({ email, password, username, profileImg, bio })
        .then((createdUser) => {
            s;
            res.status(201).json({ createdUser });
        })
        .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.status(400).json({ errormessages: ["Provide email and password."] });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ errormessages: ["User not found"] });
                return;
            }

            if (bcryptjs.compareSync(password, foundUser.password)) {
                const { _id, email, username, bio, profileImg, role } = foundUser;

                const payload = {
                    _id,
                    email,
                    username,
                    bio,
                    profileImg,
                    role,
                };

                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "6h",
                });

                res.status(200).json({ authToken });
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json(req.payload);
});

module.exports = router;
