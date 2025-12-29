const express = require('express');
const User = require('./db/userModel');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post("/register", async (request, response) => {
    try {
        // const { error } = validate(request.body);
        // if (error) return response.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: request.body.email });
        if (user) return response.status(400).send("User already exists");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
            number: request.body.number
        });

        const result = await newUser.save();
        response.status(201).send({
            message: "User Created Successfully",
            result
        });
        console.log(result);
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

module.exports = router;
