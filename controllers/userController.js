const { User, Thought } = require("../models");
const { ObjectId } = require("mongodb");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err.message))
  },
  getUsersById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user))
      .catch((err) => res.status(500).json(err.message))
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err))
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user))
      .catch((err) => res.status(500).json(err.message))
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID!" })
          : res.json({ message: "User successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  async addFriend(req, res) {
    
  },
  async removeFriend(req, res) {

  }
}



// export {
//   getAllUsers,
//   getUsersById,
//   createUser,
//   updateUser,
//   deleteUser,
//   addFriend,
//   removeFriend
// }