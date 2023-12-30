const Auth = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await Auth.findOne({email})

        if(user) return res.status(500).json({message: "Email already exists"});
        if(password.length < 6) return res.status(500).json({message: "Password must be at least 6 characters"});
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await Auth.create({
            username,
            email,
            password: passwordHash
        });
        const userToken = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({
            status: "success",
            newUser,
            userToken
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = await Auth.findOne({ $or: [{ email }, { username }] });
        if(!user) return res.status(500).json({message: "User does not exist"});

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) return res.status(500).json({message: "Incorrect password"});

        const userToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const userPayload = { username: user.username, email: user.email, isSuperAdmin: user.isSuperAdmin };
        const userPayloadString = (JSON.stringify(userPayload));
        res.cookie('userToken', userToken);
        res.status(200).json({
            status: "success",
            userPayload,
            userToken
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('userToken');
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const verifyToken = async (req, res, next) => {
    const {userToken} = req.body;
    console.log(userToken)

    if (!userToken) {
        return res.status(401).json({ message: "You need to login first" });
    }

    try {
        const verified = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await Auth.findById(verified.id);
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const userPayload = { username: user.username, email: user.email, isSuperAdmin: user.isSuperAdmin };
        const newToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        res.status(200).json({ message: "Token verified", userPayload, userToken: newToken });
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Auth.find();
        const totalUsers = await Auth.countDocuments();
        res.status(200).json({users, totalUsers});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await Auth.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Auth.findById(id);
        if(!user) return res.status(500).json({message: "User does not exist"});
        const updatedUser = await Auth.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "User updated successfully", updatedUser});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


module.exports = {register, login, logout, verifyToken, getUsers, deleteUser, updateUser};