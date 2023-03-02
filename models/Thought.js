const mongoose = require('mongoose');
const { Schema } = mongoose;
const dayjs = require('dayjs');

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

const ThoughtSchema = new Schema(
  {
    // thoughtID: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    username: {
      type: String,
      required: true
    },
    postDate: {
      type: Date,
      default: Date.now,
      get: (value) => dayjs(value).format("MM DD, YYYY [at] hh:mm a"),
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 255
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

const Thought = mongoose.model("Thought", ThoughtSchema);
module.exports = Thought;