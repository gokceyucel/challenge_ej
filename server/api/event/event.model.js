'use strict';

import mongoose from 'mongoose';

let EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  score: Number,
  badge: {
    name: String,
    info: String,
    score: Number,
    event_count: Number
  }
});

export default mongoose.model('Event', EventSchema);
