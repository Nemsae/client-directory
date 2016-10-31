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
  // lastVisit: { type: Date, default: (date) => moment(date).getTime() }
  lastVisit: { type: Date }
});
// const clientSchema = new mongoose.Schema({
//   name: {
//     first: { type: String, minLength: 1, required: true },
//     last: { type: String, minLength: 1, required: true }
//   },
//   age: { type: Number, min: 0, max: 120 },
//   allergies: [{ type: String }],
//   gender: { type: String, enum: ['Male', 'Female'] },
//   lastVisit: { type: Date }
// }, {
//   toObject: { getters: true }
// });
//
// clientSchema.virtual('timestamp_ms').get(function () {
//   return this.timestamp.getTime();
// });

// clientSchema.methods.visitUnix = function (cb = () => {}) {
//   console.log('custom: ', this);
//   // console.log('custom: ', this.lastVisit);
//   // console.log('customUnix: ', moment(this.lastVisit).unix());
//   // return this.save(cb);
// };

Client = mongoose.model('Client', clientSchema);
module.exports = Client;
