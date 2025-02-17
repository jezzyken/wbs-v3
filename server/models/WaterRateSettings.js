const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waterRateSettingsSchema = new Schema({
  ratePerCubicMeter: {
    type: Number,
    required: true
  },
  minimumCharge: {
    type: Number,
    required: true
  },
  minimumCubicMeters: {
    type: Number,
    required: true
  },
  reconnectionFee: {
    type: Number,
    required: true
  },
  membershipFee: {
    type: Number,
    required: true
  },
  disconnectionPeriodMonths: {
    type: Number,
    required: true
  },
  dueDateOffsetDays: {
    type: Number,
    required: true
  },
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  updatedBy: {
    type: String,
    ref: 'User'
  }
}, {
  timestamps: true
});

waterRateSettingsSchema.index({ status: 1, effectiveDate: -1 });

module.exports = mongoose.model("WaterRateSettings", waterRateSettingsSchema);