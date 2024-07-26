const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  birthday: { type: Date },
  height: { type: Number },
  weight: { type: Number },
  positionPlayed: { type: String },
  profilePhoto: { type: String },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    gamesMissed: { type: Number, default: 0 },
    leagueMVP: { type: Number, default: 0 },
    mythicalAwards: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
