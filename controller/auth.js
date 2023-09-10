import User from "../models/user.js";
import jwt from "jsonwebtoken";
import express from "express";
import { generateHash, validatePassword } from "../utils/auth.js";
import { expirationDate, sanatizedUser } from "../utils/functions.js";

export const register = async (req, res) => {
  try {
    const hashObj = await generateHash(req.body.password);
    const user = new User({
      ...req.body,
      hash: hashObj.hash,
      salt: hashObj.salt,
    });
    const doc = await user.save();

    const token = jwt.sign(sanatizedUser(doc), "SECRET_KEY"); // Change 'userId' to match your user ID field name

    res
      .cookie("jwt", token, {
        expires: expirationDate,
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "User registered successfully",
        user: sanatizedUser(doc),
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      // User with the provided email doesn't exist
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Now, you have the user object. You can use the validPassword function to check the password.
    const isPasswordValid = await validatePassword(
      password,
      user.hash,
      user.salt
    );
    console.log(isPasswordValid);

    if (isPasswordValid) {
      // Password is valid
      // Here, you can generate a JWT token and send it to the client for authentication.
      //   sanatizedUser(user) -> jwt_paylaod
      const token = jwt.sign(sanatizedUser(user), "SECRET_KEY");
      return res
        .cookie("jwt", token, {
          expires:expirationDate,
          httpOnly: true, //so that we can access it client side while developemnt
        })
        .status(200)
        .json({
          message: "Authentication successful",
          user: sanatizedUser(user),
          token,
        });
    } else {
      // Password is not valid
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }
  } catch (error) {
    // Handle any other errors that may occur during the process
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export const logout = async (req, res) => {
  console.log(req?.user); //if user is authenticated we can get all info in req.user
  try {
    return res.clearCookie("jwt").json({ message: " user logged out" });
  } catch (error) {
    // Handle any other errors that may occur during the process
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export const checkToken = async (req, res) => {
  try {
    return res.status(200).json({
      message: " user is authenticated",
      user: sanatizedUser(req.user),
    });
  } catch (error) {
    // Handle any other errors that may occur during the process
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
