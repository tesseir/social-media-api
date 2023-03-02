const mongoose = require("mongoose");
const { Schema } = mongoose;
const dayjs = require("dayjs");

//moving into thought schema because cant get it to import for some reason. 

const ReactionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
      get: (value) => dayjs(value).format("MM DD, YYYY [at] hh:mm a"),
    },
    reactionText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 255
    }
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false
  }
);

const Reaction = mongoose.model("Reaction", ReactionSchema);
module.exports = Reaction;