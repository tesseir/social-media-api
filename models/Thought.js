const mongoose = require('mongoose');
const { Schema } = mongoose;

import dayjs from 'dayjs';
import reactionSchema from './Reaction.js';

const thoughtSchema = new mongoose.Schema(
  {
    thoughtID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
    reactions: [reactionSchema]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

const Thought = mongoose.model("Thought", thoughtSchema);
export default Thought;