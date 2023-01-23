const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

const validate = [
    check('firstName')
        .isLength({ min: 2 })
        .withMessage('Your first name is required'),
    check('lastName')
        .isLength({ min: 2 })
        .withMessage('Your last name is required'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters.')

]

const loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters.')

]

router.post('/register', validate, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send({ success:false, message: 'User already exists! Please login.' });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id, firstName: savedUser.firstName, lastName: savedUser.lastName, email: savedUser.email }, 'SECRETKEYADDED');
        res.send({
            success: true, data: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            },
            token
        });
     } catch (error) {
        res.status(400).send({ success: false, error });
     }
})


router.post('/login', loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(404).send({ success: false, message: 'User is not registered.' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(404).send({ message: 'Invalid Password' })

    const token = jwt.sign({ _id: user._id, email: user.email }, 'SECRETKEYADDED');
    console.log('token' + token)
    res.header('auth-token', token).send({ success: true, message: 'Logged in successfully', token })

})

module.exports = router;