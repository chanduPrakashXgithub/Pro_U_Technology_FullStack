import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from '../models/Employee.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const seed = async () => {
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Task.deleteMany({});

    const admin = await new User({ username: 'admin', password: 'admin123', role: 'admin' }).save();

    const employees = await Employee.insertMany([
        { name: 'John Doe', email: 'john@company.com', department: 'Engineering' },
        { name: 'Jane Smith', email: 'jane@company.com', department: 'HR' }
    ]);

    await Task.insertMany([
        { title: 'Review Code', description: 'Review pull request', status: 'pending', assignedTo: employees[0]._id, createdBy: admin._id },
        { title: 'Update Docs', description: 'Update user manual', status: 'completed', assignedTo: employees[1]._id, createdBy: admin._id }
    ]);

    console.log('Seed data inserted');
    process.exit();
};

seed();