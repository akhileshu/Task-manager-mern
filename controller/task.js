import Task from "../models/task.js";
import { getCurrentISTDateTime, getTimeStamp } from "../utils/functions.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const doc = await task.save();

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: "Error creating task" });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.params; // Extracting Id from route parameter
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};

export const updateTask = async (req, res) => {
  let { _id } = req.body; // Extracting Id from req.body

  try {
    
    const task = await Task.findByIdAndUpdate(
      _id,
      { ...req.body, lastUpdate: getCurrentISTDateTime() },
      {
        new: true, //return updated product
      }
    );

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Error updating task" });
  }
};

export const fetchAllTasks = async (req, res) => {
  // filter = status = ["todo", "inProgress", "completed"],
  // sort = {_sort:"dueDate/creationDate",_order="desc/asc"}
  // order is important
  // console.log('hi',req.query.status)
  let query, totalTasksQuery;
  // const {_id}=req.user //i am fetching by user id 
  if (req.params.id) {
    query = Task.find({ userId: req.params.id });
    totalTasksQuery = Task.find({ userId: req.params.id });
  } else {
    query = Task.find({});
    totalTasksQuery = Task.find({});
  }
  // const _id='64f8472849aba2864571904a'
  // query = Task.find({ userId: _id });
  //   totalTasksQuery = Task.find({ userId: _id });

  if (req.query.status) {
    query = query.find({ status: req.query.status });
    totalTasksQuery = totalTasksQuery.find({ status: req.query.status });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalTasksQuery = totalTasksQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }

  if (req.query._page && req.query._limit) {
    // its for pagination
    // this many doc i need to skip
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docslength = await totalTasksQuery.count().exec();
    // console.log({ docslength }); //i can send in json or set as header
    const docs = await query.exec();
    // if(!docs)res.status(404).json({ message: "no tasks to fetch" });
    res.header("X-Total-Results", docslength).status(200).json({docs});
  } catch (error) {
    res.status(400).json({ error: "Error fetching tasks by filter" });
  }
};
