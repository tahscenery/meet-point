const { User } = require("../models");

async function allUsers(_, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error, message: "Failed to retrieve users" });
  }
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error, message: "Failed to create user" });
  }
}

async function readUser(req, res) {
  // res.status(200).json({ ...req.profile, hashedPassword: undefined, salt: undefined })
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error, message: "Failed to  users" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const updatedUser = await user.updateOne(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update user" });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const deletedUser = await user.remove();
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error, message: "Failed to delete user" });
  }
}

module.exports = {
  allUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
