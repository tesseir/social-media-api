const { Thought, User } = require("../models");

module.exports = {
  getAllUserThoughts(req, res,) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err.message))
  },

  getOneUserThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No Thought found with that ID" })
          : res.json(thought))
      .catch(err => res.status(500).json(err.message))
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        return User.findOneAndUpdate(
          { username: User.username },
          { $addToSet: { thoughts:thought } },
          { new: true }),
          res.json(thought)})
      .catch(err => res.status(500).json(err))
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No Thought found with that ID" })
          : res.json(thought))
      .catch(err => res.status(500).json(err.message))
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.status(200).json({ message: "Thought deleted at that ID" }))
      .catch(err => res.status(500).json(err.message))
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No Reaction found at this Reaction ID" })
          : res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No Reaction found at this Reaction ID" })
          : res.status(200).json({ message: "Reaction deleted at that Reaction ID" }))
      .catch((err) => res.status(500).json(err));
  }
}

