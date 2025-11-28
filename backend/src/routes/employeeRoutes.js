import express from 'express';
import { getEmployees, createEmployeePost, updateEmployeePut, deleteEmployeeDelete } from '../controllers/employeeController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getEmployees);
router.post('/', authenticate, requireRole(['admin']), createEmployeePost);
router.put('/:id', authenticate, requireRole(['admin']), updateEmployeePut);
router.delete('/:id', authenticate, requireRole(['admin']), deleteEmployeeDelete);

export default router;