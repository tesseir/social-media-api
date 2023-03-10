const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: 'string',
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  {
    toJSON: {virtuals: true},
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;