const { User } = require("../models");

async function allUsers(_, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve users", error });
  }
}

async function createUser(req, res) {
  try {
    console.log(req.body);
    const user = new User(req.body);
    console.log(user);
    const newUser = await user.save();
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    if (error.error?.code === 10000 || 11000) {
      res
        .status(500)
        .json({ message: "A user with that email already exists", error });
    } else {
      res.status(500).json({ message: "Failed to create user", error });
    }
  }
}

async function readUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to get users", error });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const updatedUser = await user.updateOne(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user", error });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const deletedUser = await user.remove();
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user", error });
  }
}

module.exports = {
  allUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
