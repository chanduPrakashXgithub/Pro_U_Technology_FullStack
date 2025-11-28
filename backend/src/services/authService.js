import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (username, password, role = 'user') => {
    const user = new User({ username, password, role });
    await user.save();
    return generateToken({ id: user._id, role: user.role });
};

export const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    return generateToken({ id: user._id, role: user.role });
};