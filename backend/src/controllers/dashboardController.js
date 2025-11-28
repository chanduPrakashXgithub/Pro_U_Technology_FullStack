import { getDashboardData } from '../services/taskService.js';

export const getDashboard = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};