'use strict';

import mongoose from 'mongoose';

var InviteSchema = new mongoose.Schema({
  inviting_user_id: mongoose.Schema.Types.ObjectId,
  invited_email: {
    type: String,
    lowercase: true
  },
  token: String,
  date: {
    type: Date,
    default: Date.now
  },
  used: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Invite', InviteSchema);
