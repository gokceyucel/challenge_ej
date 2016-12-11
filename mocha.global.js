import app from './';
import mongoose from 'mongoose';

after(function(done) {
  app.emlakjetChallenge.on('close', () => done());
  mongoose.connection.close();
  app.emlakjetChallenge.close();
});
