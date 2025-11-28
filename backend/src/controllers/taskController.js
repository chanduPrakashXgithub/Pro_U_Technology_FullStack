import { getAllTasks, createTask, updateTask, getTasksFiltered, deleteTask, getTaskById } from '../services/taskService.js';
import updatesEmitter from '../utils/updatesEmitter.js';

export const getTasks = async (req, res) => {
    try {
        const { status, assignedTo } = req.query;
        const filters = { status, assignedTo };
        const tasks = await getTasksFiltered({ role: req.user.role, userId: req.user.id }, filters);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTaskPost = async (req, res) => {
    try {
        const task = await createTask(req.body, req.user.id);
        // notify subscribers
        updatesEmitter.emit('dataUpdated', { scope: 'tasks', action: 'created', id: task._id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskPut = async (req, res) => {
    try {
        const task = await updateTask(req.params.id, req.body);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        updatesEmitter.emit('dataUpdated', { scope: 'tasks', action: 'updated', id: task._id });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTaskDelete = async (req, res) => {
    try {
        const task = await deleteTask(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        updatesEmitter.emit('dataUpdated', { scope: 'tasks', action: 'deleted', id: req.params.id });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};