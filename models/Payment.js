const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    referenceNo: {
      type: String,
      required: true,
      unique: true,
    },
    billId: {
      type: Schema.Types.ObjectId,
      ref: "Bill",
    },
    consumerId: {
      type: String,
      required: true,
      ref: "Consumer",
    },
    amount: {
      type: Number,
      required: true,
    },
    amountReceived: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "CASH",
    },
    paymentType: {
      type: String,
      enum: ["BILL_PAYMENT", "MEMBERSHIP_FEE", "RECONECTION_FEE"],
      required: true,
    },
    selectedFees: [
      {
        name: String,
        amount: Number,
        description: String,
        billId: {
          type: Schema.Types.ObjectId,
          ref: "Bill",
        },
        billIds: [
          {
            type: Schema.Types.ObjectId,
            ref: "Bill",
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "reversed"],
      default: "pending",
    },
    processedBy: {
      type: String,
      ref: "User",
      default: "67ac4a5736ca228e4e71f829",
    },
    transactionReference: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

async function generateReferenceNo() {
  try {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const count = await mongoose.model("Payment").countDocuments({
      createdAt: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    });

    const sequence = String(count + 1).padStart(4, "0");
    return `PAY${year}${month}${day}${sequence}`;
  } catch (error) {
    throw new Error(`Failed to generate reference number: ${error.message}`);
  }
}

paymentSchema.pre("validate", async function (next) {
  if (!this.referenceNo) {
    this.referenceNo = await generateReferenceNo();
  }
  next();
});

paymentSchema.index({ consumerId: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
