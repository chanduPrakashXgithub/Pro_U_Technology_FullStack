import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService.js';
import updatesEmitter from '../utils/updatesEmitter.js';

export const getEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEmployeePost = async (req, res) => {
    try {
        const employee = await createEmployee(req.body);
        updatesEmitter.emit('dataUpdated', { scope: 'employees', action: 'created', id: employee._id });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEmployeePut = async (req, res) => {
    try {
        const employee = await updateEmployee(req.params.id, req.body);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        updatesEmitter.emit('dataUpdated', { scope: 'employees', action: 'updated', id: employee._id });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEmployeeDelete = async (req, res) => {
    try {
        const emp = await deleteEmployee(req.params.id);
        if (!emp) return res.status(404).json({ message: 'Employee not found' });
        updatesEmitter.emit('dataUpdated', { scope: 'employees', action: 'deleted', id: req.params.id });
        // tasks related to this employee were cascade-deleted by service
        updatesEmitter.emit('dataUpdated', { scope: 'tasks', action: 'deleted-by-employee', id: req.params.id });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};