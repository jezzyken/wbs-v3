const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meterReadingSchema = new Schema({

  consumerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Consumer",
  },
  previousReading: {
    type: Number,
    required: true
  },
  currentReading: {
    type: Number,
    required: true
  },
  readingDate: {
    type: Date,
    required: true
  },
  consumption: {
    type: Number,
    required: true
  },
  readBy: {
    type: String,
    ref: 'User',
    default: "67ac4a5736ca228e4e71f829",
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

meterReadingSchema.index({ consumerId: 1, readingDate: 1 });
meterReadingSchema.index({ meterNumber: 1 });

module.exports = mongoose.model('MeterReading', meterReadingSchema);