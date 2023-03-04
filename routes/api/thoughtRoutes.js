const router = require('express').Router();

const {
  getAllUserThoughts,
  getOneUserThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController')

router.route("/")
  .get(getAllUserThoughts)
  .post(createThought)

router.route("/:id")
  .get(getOneUserThought)
  .put(updateThought)
  .delete(deleteThought)

router.route("/:id/reactions")
  .post(addReaction)

router.route("/:id/reactions/:reactionId")
  .delete(removeReaction)

module.exports = router;
