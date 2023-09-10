import User from "../models/user.js";
import { sanatizedUser } from "../utils/functions.js";

export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    // console.log(user)
    res.status(201).json(sanatizedUser(user));
  } catch (error) {
    res.status(400).json({ error: "Error fetching User By Id" });
    // console.log(error)
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);

  try {
    // Create an object with the fields you want to update (excluding 'password')

    const checkUser = await User.findById(id);
    if (
      !(
        (req.body.email && req.body.email !== checkUser.email) ||
        (req.body.name && req.body.name !== checkUser.name)
      )
    ) {
      return res.status(403).json({ message: "User can't be updated " }); // 204 No Content because no update done
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated user
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: sanatizedUser(user) });
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
};
