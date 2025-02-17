const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentHistorySchema = new Schema({
  consumerId: {
    type: String,
    required: true,
    ref: 'Consumer'
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  amount: {
    type: Number,
    required: true
  },
  description: String
}, {
  timestamps: true
});

paymentHistorySchema.index({ consumerId: 1, createdAt: -1 });

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);