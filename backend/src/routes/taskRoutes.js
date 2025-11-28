import express from 'express';
import { getTasks, createTaskPost, updateTaskPut, deleteTaskDelete, getTask } from '../controllers/taskController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTask);
router.post('/', authenticate, requireRole(['admin']), createTaskPost);
router.put('/:id', authenticate, requireRole(['admin']), updateTaskPut);
router.delete('/:id', authenticate, requireRole(['admin']), deleteTaskDelete);

export default router;