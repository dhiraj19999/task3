import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
   
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'InProgress', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
}, {
    timestamps: true,
})

const Task = mongoose.model('Task', taskSchema)
export default Task