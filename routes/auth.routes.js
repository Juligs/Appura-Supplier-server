const router = require("express").Router();
const bcryptjs = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../midleware/jwt.middleware')
// const { isLoggedOut } = require('./../middleware/route-guard');

// User Sign Up 
router.post('/signup', (req, res, next) => {
    const { email, password, username, profileImg, bio } = req.body


    if (password === undefined) {
        res.status(400).json({ message: 'Invalid Password' })
        return
    }

    if (email === undefined) {
        res.status(400).json({ message: 'Email not found' })
        return
    }


    if (password.length < 5) {
        res.status(400).json({ message: 'Password must have at least 4 characters' })
        return
    }

    // Search user by email 

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists" })
                return
            }
            const salt = bcryptjs.genSaltSync(saltRounds)
            const hashedPassword = bcryptjs.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, profileImg, bio })
        })

        .then((createdUser) => {
            res.status(201).json({ createdUser })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }


    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            console.log(foundUser.password)
            console.log(password)

            if (bcryptjs.compareSync(password, foundUser.password)) {

                const { _id, email, username, bio, profileImg } = foundUser;

                const payload = { _id, email, username, bio, profileImg }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })

        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        });


})

router.get('/verify', isAuthenticated, (req, res) => {
    console.log('Check', req.payload)
    res.status(200).json(req.payload)
})



module.exports = router;