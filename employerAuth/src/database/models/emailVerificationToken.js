
const mongoose = require('mongoose');
const db = require('../connection')



const emailVerificationTokenSchema = new mongoose.Schema({
  email: String,
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 10 minutes in seconds
  }
});


emailVerificationTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
const EmailVerificationTokens = db.model('EmailVerificationTokens', emailVerificationTokenSchema);

module.exports = {
  EmailVerificationTokens
};
