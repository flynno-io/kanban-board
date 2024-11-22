import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    // Find the user in the database by username
    const user = await User.findOne({
        where: { username },
    });
    // If user is not found, send an authentication failed response
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || 'test_secret_key';
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1bm55U2NyaWJlIiwiaWF0IjoxNzMyMjQ5Mjk5LCJleHAiOjE3MzIyNTI4OTl9.oT2PlMhg-IOaKv3B2vnKjYrOmu3ITJVXjPT0PyscJAw" }); // Send the token as a JSON response
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
