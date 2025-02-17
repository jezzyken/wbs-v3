const express = require("express");
const router = express.Router();
const MeterReading = require("../models/MeterReading");
const Bill = require("../models/Bill");

const validateReading = (req, res, next) => {
  const { currentReading, previousReading } = req.body;

  if (currentReading < previousReading) {
    return res.status(400).json({
      error: "Current reading cannot be less than previous reading",
    });
  }

  next();
};

router.get("/", async (req, res) => {
  try {
    const readings = await MeterReading.find()
      .populate("consumerId", "firstName lastName consumerId")
      .populate("readBy", "username firstName lastName")
      .sort({ readingDate: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reading = await MeterReading.findById(req.params.id)
      .populate("consumerId", "firstName lastName consumerId")
      .populate("readBy", "username firstName lastName");
    if (!reading)
      return res.status(404).json({ message: "Meter reading not found" });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', validateReading, async (req, res) => {
  try {
    const reading = new MeterReading({
      ...req.body,
      consumption: req.body.currentReading - req.body.previousReading
    });

    console.log(reading)

    const lastReading = await MeterReading.findOne({
      consumerId: reading.consumerId,
      readingDate: { $lt: reading.readingDate }
    }).sort({ readingDate: -1 });

    let billingPeriod = {
      to: reading.readingDate
    };

    if (lastReading) {
      billingPeriod.from = lastReading.readingDate;
    } else {
      const fromDate = new Date(reading.readingDate);
      fromDate.setDate(fromDate.getDate() - 30);
      billingPeriod.from = fromDate;
    }

    await reading.save();

    const dueDate = new Date(reading.readingDate);
    dueDate.setDate(dueDate.getDate() + 10);

    const previousBalance = await Bill.getPreviousBalance(reading.consumerId);

    const rate = 18;
    let amount;
    
    if (reading.consumption <= 6) {
      amount = 120;
    } else {
      amount = reading.consumption * rate;
    }

    const totalAmountDue = amount + previousBalance;

    const bill = new Bill({
      consumerId: reading.consumerId,
      meterReadingId: reading._id,
      billingPeriod,
      consumption: reading.consumption,
      rate,
      amount,
      previousBalance,
      totalAmountDue,
      dueDate,
    });

    console.log(bill)

    await bill.save();

    res.status(201).json({
      reading,
      bill
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reading = await MeterReading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reading)
      return res.status(404).json({ message: "Meter reading not found" });
    res.json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
