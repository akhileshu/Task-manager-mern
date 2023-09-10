import express from "express";
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  updateTask,
} from "../controller/task.js";

const router = express.Router();

// url -> root/task
router
//   .get("/fetch/:id", getTasksByUserId)
  .post("/add", createTask)
  .delete("/delete/:id", deleteTask)
  .patch("/update", updateTask)
  .get("/fetch", fetchAllTasks) //get all by filteration
  .get("/fetch/:id", fetchAllTasks); //get by userId and get filtered

export default router;
