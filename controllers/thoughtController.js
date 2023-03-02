const { Thought, User, Reaction } = require("../models");
const { ObjectId } = require("mongodb");

module.exports = {
  getAllUserThoughts(req, res,) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch((err) => res.status(500).json(err.message))
  },
  getOneUserThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No Thought found with that ID" })
          : res.json(user))
      .catch((err) => res.status(500).json(err.message))
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought } },
          { new: true }
        )})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true })
      .then((thought) =>
      !user
        ? res.status(404).json({ message: "No Thought found with that ID" })
        : res.json(thought))
    .catch((err) => res.status(500).json(err.message))
  }
}
