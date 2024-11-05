const User = require("../models/user");
const jwt = require('jsonwebtoken');

const generateToken = (user)=>{
    return jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});

};


exports.signup = async (req,res)=>{
    const {name,email,password}= req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message:'User already exists'});

        const user = await User.create({name,email,password});
        const token = generateToken(user);

        res.status(201).json({user:{id: user._id, name:user.name, email:user.email},token});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};

exports.login = async (req,res) => {
    const {email,password}= req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password)))
            return res.status(400).json({message:'Invalid credentials'});

        const token = generateToken(user);

        res.status(200).json({user: {id:user._id, name: user.name, email: user.email},token});
    } catch (error){
        res.status(500).json({error:error.message});

    }
};

