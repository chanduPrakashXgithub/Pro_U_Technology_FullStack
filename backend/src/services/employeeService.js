import Employee from '../models/Employee.js';
import Task from '../models/Task.js';

export const getAllEmployees = async () => {
    return await Employee.find({});
};

export const createEmployee = async (data) => {
    const employee = new Employee(data);
    return await employee.save();
};

export const updateEmployee = async (id, data) => {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEmployee = async (id) => {
    const emp = await Employee.findByIdAndDelete(id);
    if (emp) {
        // cascade delete tasks assigned to this employee
        await Task.deleteMany({ assignedTo: emp._id });
    }
    return emp;
};