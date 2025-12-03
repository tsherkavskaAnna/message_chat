const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const  User  = require('../models/user');
const { SECRET_KEY } = process.env;

const authorized = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return next (HttpError((401, "Missing or invalid Authorization header")));
        }

        const payload = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    
    } catch {
        next(HttpError(401, "Error authorization"));
   } 
}

module.exports = authorized