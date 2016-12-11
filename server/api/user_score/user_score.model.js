'use strict';

import mongoose from 'mongoose';

let UserScoreSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  event_id: mongoose.Schema.Types.ObjectId,
  type: String,
  score: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('UserScore', UserScoreSchema);
