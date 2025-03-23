import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';

//Check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    console.log("JWT Cookie:", req.cookies.jwt);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log("Authenticated user:", req.user);
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        console.error("No token provided");
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

//Check if the user is an admin or not
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        console.log("Admin authorized:", req.user);
        next();
    } else {
        console.error("Admin authorization failed");
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { authenticate, authorizeAdmin };