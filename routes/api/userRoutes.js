const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController')

router.route("/")
  .get(getAllUsers)
  .post(createUser)

router.route("/:id")
  .get(getUsersById)
  .put(updateUser)
  .delete(deleteUser)

router.route("/:id/friend/:friendId")
  .post(addFriend)
  .delete(removeFriend)

module.exports = router;