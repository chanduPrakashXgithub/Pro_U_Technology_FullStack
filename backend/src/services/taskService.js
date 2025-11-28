import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const getAllTasks = async () => {
    return await Task.find({}).populate('assignedTo', 'name email');
};

export const getTaskById = async (id) => {
    return await Task.findById(id).populate('assignedTo', 'name email');
};

export const getTasksFiltered = async ({ role, userId }, filters = {}) => {
    const query = {};
    // apply status filter for everyone when provided
    if (filters.status) query.status = filters.status;
    // apply assignedTo filter only when provided and valid
    if (filters.assignedTo) {
        if (mongoose.Types.ObjectId.isValid(filters.assignedTo)) {
            query.assignedTo = filters.assignedTo;
        }
        // invalid assignedTo filter is ignored to avoid cast errors
    }
    return await Task.find(query).populate('assignedTo', 'name email');
};

export const createTask = async (data, userId) => {
    // validate assignedTo
    if (!data.assignedTo || !mongoose.Types.ObjectId.isValid(data.assignedTo)) {
        throw new Error('Invalid or missing assignedTo employee id');
    }
    const task = new Task({ ...data, createdBy: userId });
    return await task.save();
};

export const updateTask = async (id, data) => {
    // if assignedTo provided, validate it
    if (data.assignedTo && !mongoose.Types.ObjectId.isValid(data.assignedTo)) {
        throw new Error('Invalid assignedTo employee id');
    }
    return await Task.findByIdAndUpdate(id, data, { new: true }).populate('assignedTo', 'name email');
};

export const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

export const getDashboardData = async () => {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(2) : 0;
    return { totalTasks, completedTasks, completionRate };
};