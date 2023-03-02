const { User, Thought } = require("../models");
const { ObjectId } = require("mongodb");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err.message))
  },

  getUsersById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .then(user =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user))
      .catch(err => res.status(500).json(err.message))
  },

  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err))
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true })
      .then(user =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user))
      .catch(err => res.status(500).json(err.message))
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then(user =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.status(200).json({ message: "User deleted at that ID" }))
      .catch(err => res.status(500).json(err.message))
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true })
      .then(user =>
        !user
          ? res.status(404).json({ message: "No User found at this Friend ID" })
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true })
      .then(user =>
        !user
          ? res.status(404).json({ message: "No User found at this Friend ID" })
          : res.status(200).json({ message: "Friend removed at that Friend ID" }))
      .catch((err) => res.status(500).json(err));
  }
}


