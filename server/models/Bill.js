const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    billNo: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        const random = Math.floor(100000 + Math.random() * 900000);
        const timestamp = Date.now().toString();
        return `BILL-${timestamp.slice(-6)}${random}`;
      },
    },
    consumerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Consumer",
    },
    meterReadingId: {
      type: Schema.Types.ObjectId,
      ref: "MeterReading",
      required: true,
    },
    billingPeriod: {
      from: Date,
      to: Date,
    },
    consumption: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      default: 18,
    },
    amount: {
      type: Number,
      required: true,
    },
    previousBalance: {
      type: Number,
      default: 0,
    },
    totalAmountDue: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "overdue"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

billSchema.statics.getPreviousBalance = async function (consumerId) {
  const unpaidBills = await this.find({
    consumerId: consumerId,
    status: { $in: ["unpaid", "overdue"] },
    dueDate: { $lt: new Date() },
  }).select("amount paidAmount");

  return unpaidBills.reduce((total, bill) => {
    return total + (bill.amount - bill.paidAmount);
  }, 0);
};

billSchema.statics.getBillHistory = async function (consumerId) {
  return this.find({ consumerId })
    .sort({ "billingPeriod.from": -1 })
    .populate("meterReadingId")
    .lean();
};

billSchema.index({ consumerId: 1, status: 1, dueDate: 1 });

module.exports = mongoose.model("Bill", billSchema);
