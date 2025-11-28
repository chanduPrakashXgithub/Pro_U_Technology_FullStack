import express from 'express';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { authenticate } from './middlewares/authMiddleware.js';
import { getDashboard } from './controllers/dashboardController.js';
import { sseUpdatesHandler } from './controllers/updatesController.js';

export default function setupApp(server) {
    server.use('/api/auth', authRoutes);
    server.use('/api/employees', employeeRoutes);
    server.use('/api/tasks', taskRoutes);

    server.get('/api/dashboard', authenticate, getDashboard);
    server.get('/api/updates', authenticate, sseUpdatesHandler);

    server.use(errorMiddleware);
}