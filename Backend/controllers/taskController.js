
import { mongo } from "mongoose";
import Task from "../models/taskModel.js";


const createTask = async (req, res) => {
    const {projectId}=req.params;
    const {title, description, status} = req.body;


    if (!title || !description ) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const task = new Task({
            user: req.user._id,
            title,
            description,
            project: projectId,
            status
        });

        const createdTask = await task.save();

        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getTasksbyProjectId = async (req, res) => {
    const {projectId}=req.params;
    try {
        const tasks = await Task.find({ project: projectId }).populate("user", "name email").populate("project", "name description");
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
}
const getTaskById = async (req, res) => {
    const {taskId}=req.params;

    try {
        const task = await Task.findById(taskId).populate("user", "name email").populate("project", "name description");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }   
        res.status(200).json(task);


        } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}



const updateTask = async (req, res) => {
    const {taskId}=req.params;
    const {title, description, status} = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const deleteTask = async (req, res) => {
    const {taskId}=req.params;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }       
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getTaskbyUserId = async (req, res) => {

    try {
        const tasks = await Task.find({ user: req.user._id }).populate("user", "name email").populate("project", "name description");
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
 export { createTask, getTasksbyProjectId, updateTask, deleteTask,getTaskById,getTaskbyUserId };