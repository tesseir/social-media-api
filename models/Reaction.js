const mongoose = require("mongoose");
const { Schema } = mongoose;

import dayjs from 'dayjs';

const reactionSchema = new mongoose.Schema(
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
  reactionText:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255
  }
},
{
  toJSON: { virtuals: true, getters: true},
  id: false
}
);

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;