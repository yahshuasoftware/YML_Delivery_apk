const jwt = require('jsonwebtoken');
const user = require('../models/user');

const protect = async (req,res,next)=>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token == req.headers.authorization.split(' ')[1];

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decoded.id).select('-password');
            next();
        } catch (error){
            res.status(401).json({message:'Not authorized, token failed'});

        }
    }

    if(!token){
        res.status(401).json({message: 'Not authorized, no token'});
    }
};

module.exports = protect;