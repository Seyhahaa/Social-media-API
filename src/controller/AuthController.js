const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const {
            username,
            email,
            password,
            address,
            work,
            profile_picture,
        } =req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
            work,
            profile_picture,
        });
        try {
           await newUser.save();
           return res.status(201).json(newUser);
        }catch (err) {
            return res.status(400).json(err);
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: 'Unauthentication'});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: 'Password mismatch'});
        const token = getToken(user);

        return res.status(200).json({
            user,
            token,
            message: 'Authentication successful'
        });
        }catch (error){
            return res.status(400).json({message: error.message})
        }
    },
    checkAuth: async (req, res) => {
        try {
            const id = req.user._id;
        const user = await User.findById(id);
        res.status(200).json(user)
        }catch (err) {
            res.status(401).json({message: "Unauthentication"})
        }
    }
}
module.exports = authController;

function getToken (user) {
    return jwt.sign({
        data: user
    }, process.env.JWT_KEY, {expiresIn: '5h' })
}