import express from 'express'; 

import { createTask, getTasksbyProjectId, updateTask, deleteTask,getTaskById,getTaskbyUserId} from '../controllers/taskController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for creating a task
router.route('/:projectId').post(protect, createTask);

// Route for getting all tasks for a project

router.route('/project/:projectId').get(protect, getTasksbyProjectId);

// Route for getting a task by ID

router.route('/:taskId').get(protect, getTaskById);

// Route for getting  tasks by user ID

router.route('/').get(protect, getTaskbyUserId);

// Route for updating a task by ID

router.route('/:taskId').put(protect, updateTask);

// Route for deleting a task by ID

router.route('/:taskId').delete(protect, deleteTask);

export default router;