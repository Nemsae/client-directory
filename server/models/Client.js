const mongoose = require('mongoose');
const moment = require('moment');

let Client;

const clientSchema = new mongoose.Schema({
  name: {
    first: { type: String, minLength: 1, required: true },
    last: { type: String, minLength: 1, required: true }
  },
  age: { type: Number, min: 0, max: 120 },
  allergies: [{ type: String }],
  gender: { type: String, enum: ['Male', 'Female'] },
  lastVisit: { type: Date }
});

Client = mongoose.model('Client', clientSchema);
module.exports = Client;
