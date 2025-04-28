import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';

import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));