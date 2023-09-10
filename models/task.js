import mongoose from 'mongoose'
import { getCurrentISTDateTime } from '../utils/functions.js';
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: { type: mongoose.ObjectId ,required: true},
  title: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end of the string
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  creationDate: {
    type: Date,
    default: getCurrentISTDateTime,
  },
  lastUpdate:{
    type: Date
  },
  dueDate: {
    type: Date,
    required: true, 
  },
  status: {
    type: String,
    required: true,
    enum: ["todo", "inProgress", "completed"],
    default: "todo",
  },
  // You can add more fields as needed for your specific task requirements
});

const Task = mongoose.model("Task", taskSchema);


export default Task;
