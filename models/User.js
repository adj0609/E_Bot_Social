const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/],
    },

    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        },
      ],

      friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
      ],
  },
  
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
  );

  // get total count of friends
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  // create the user model using the userSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;