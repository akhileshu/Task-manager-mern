import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import taskRoute from "./routes/task.js";
import userRoute from "./routes/user.js";
import { errorHandler } from "./middlewares/errorHandling.js";
import { connectToDb } from "./config/db.js";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
// for using path
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as you normally would in CommonJS modules.


const app = express();

dotenv.config(); // Load the .env file
connectToDb(); //you are now connected to db
app.use(passport.initialize()); // Initialize Passport

// middlewares
const corsOptions = {
  origin: [
    "http://localhost:3000",//for react
    "http://localhost:8000",//for api
    "http://example.com", // Add additional origins here
    "https://another-website.com",
  ],
  exposedHeaders: ["X-Total-Results"],
  credentials: true, // Allow credentials (cookies)
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// routes

app.use("/auth", authRoute);
app.use("/task",passport.authenticate("jwt", { session: false }), taskRoute);
app.use("/user",passport.authenticate("jwt", { session: false }), userRoute);
// app.use(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send("you are authenticated");
//   }
// );

// Catch-all route to serve the React app's HTML
// works when user refreshes and lands on the same page
// also in react router handle the * path with 404 page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Add a middleware to store the current path in a cookie


// Add a 404 middleware
app.use((req, res, next) => {
  res.status(404).send("Resource does not exist! Please try changing url path");
  
});

// Add a catch-all middleware after the 404 middleware to redirect to the stored path


app.use(errorHandler);

app.listen(process.env.PORT || 8080, () =>
  console.log("server started on port 8000")
);
// '0.0.0.0'->Configure Express to Listen on All Network Interfaces:
