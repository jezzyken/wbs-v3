const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Consumer = require("../models/Consumer");
const Bill = require("../models/Bill");
const PaymentHistory = require("../models/PaymentHistory");

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("consumerId", "firstName lastName consumerId")
      .populate("billId")
      .populate("processedBy", "username firstName lastName")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("consumerId", "firstName lastName consumerId")
      .populate("billId")
      .populate("processedBy", "username firstName lastName");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      consumerId,
      amount,
      amountReceived,
      change,
      paymentType,
      selectedFees,
      status,
      notes,
      paymentMethod,
    } = req.body;

    const paymentData = {
      consumerId,
      amount,
      amountReceived,
      change,
      paymentType,
      selectedFees,
      status,
      notes,
      paymentMethod,
    };

    const payment = new Payment(paymentData);
    await payment.save({ session });

    if (paymentType === "BILL_PAYMENT") {
      const billUpdates = [];

      for (const fee of selectedFees) {
        if (fee.name === "Current Bill" && fee.billId) {
          billUpdates.push({
            billId: fee.billId,
            amount: fee.amount,
          });
        } else if (fee.name === "Unpaid Balance" && fee.billIds) {
          fee.billIds.forEach((billId) => {
            billUpdates.push({
              billId,
              amount: fee.amount / fee.billIds.length,
            });
          });
        }
      }

      for (const update of billUpdates) {
        await Bill.findByIdAndUpdate(
          update.billId,
          {
            $set: {
              status: "paid",
              paidAmount: update.amount,
              paymentDate: new Date(),
            },
          },
          { session }
        );
      }
    }

    const paymentHistoryData = {
      consumerId: payment.consumerId,
      paymentId: payment._id,
      actionType: "payment_received",
      amount: payment.amount,
      description: `Payment received via ${paymentMethod} for ${selectedFees
        .map((fee) => fee.name)
        .join(", ")}`,
    };

    await PaymentHistory.create([paymentHistoryData], { session });

    await session.commitTransaction();
    res.status(201).json({ payment });
  } catch (error) {
    await session.abortTransaction();
    console.error("Payment processing error:", error);
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
