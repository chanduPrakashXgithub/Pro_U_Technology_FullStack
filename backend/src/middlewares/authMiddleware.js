import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
    // allow token via Authorization header or ?token= query (useful for SSE/EventSource)
    let token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token && req.query && req.query.token) token = req.query.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};