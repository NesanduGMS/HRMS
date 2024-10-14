const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// User registration
exports.registerUser = async (req, res) => {
    try {
        const { User_Id, User_Password } = req.body;  // Use User_Id and User_Password
        // Add logic to hash User_Password and save the user in the database
        // *****************************************
        const newUser = await UserModel.createUser(User_Id, User_Password);  // Pass User_Password
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        console.log("Request Body: ", req.body);  // Log request body
        const { User_Id, User_Password } = req.body;
        const user = await UserModel.findUserByUserId(User_Id);
        console.log("User Found: ", user);  // Log found user
        if (user && user.User_Password === User_Password) {
            const token = jwt.sign({ id: user.User_Id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Login Error: ", error);  // Log the error
        res.status(500).json({ message: 'Login failed', error });
    }
};
