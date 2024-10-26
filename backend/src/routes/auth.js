const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
require('dotenv').config();
SECRET_KEY = process.env.JWT_SECRET

router.post('/register', async (req, res) => {

    try {
        console.log(SECRET_KEY);
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        console.log("Error", error);
        res.status(500).json({ msg: 'Error creating user' });
    }
});




router.get('/register', async(req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({error:"Unable to get users"})
    }
})

router.post('/login', async(req, res) => {
    console.log(req.body);
    try {
        const { email, password} = req.body
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({error: "Invalid Credential"})
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid , 'validPass');
        console.log(SECRET_KEY);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid Credentials"})
        }
        const token = jwt.sign({userID: user._id}, SECRET_KEY, { expiresIn: '1hr' })
        console.log(token);
        res.json({message: "Login Successfully" , token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
})

module.exports = router;
