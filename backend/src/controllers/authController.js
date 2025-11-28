import { body, validationResult } from 'express-validator';
import { login, register } from '../services/authService.js';

export const loginPost = [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const { username, password } = req.body;
            const token = await login(username, password);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
];

export const registerPost = [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const { username, password, role } = req.body;
            const token = await register(username, password, role);
            res.status(201).json({ token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

export const meGet = (req, res) => {
    // `authenticate` middleware sets `req.user` to the decoded token payload
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    res.json(req.user);
};