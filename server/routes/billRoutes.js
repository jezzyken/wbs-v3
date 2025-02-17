const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Bill = require("../models/Bill");
const Consumer = require("../models/Consumer");
const moment = require("moment-timezone");
const path = require('path');

router.get("/", async (req, res) => {
  try {
    const { to, consumerId, status } = req.query;

    console.log(to, consumerId, status)

    let dateMatch = {};
    let consumerMatch = {};
    let statusMatch = {};

    if (to) {
      const queryDate = moment.tz(to, "Asia/Singapore");
      const startOfMonth = new Date(
        queryDate.clone().startOf("month").toISOString()
      );
      const endOfMonth = new Date(
        queryDate.clone().endOf("month").toISOString()
      );

      dateMatch = {
        "billingPeriod.to": {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      };
    }

    if (consumerId) {
      consumerMatch = { consumerId: new mongoose.Types.ObjectId(consumerId) };
    }

    if (status) {
      statusMatch = { status: status };
    }

    const bills = await Bill.aggregate([
      {
        $match: {
          ...dateMatch,
          ...consumerMatch,
          ...statusMatch,
        },
      },
      {
        $lookup: {
          from: "consumers",
          localField: "consumerId",
          foreignField: "_id",
          as: "consumer",
        },
      },
      {
        $lookup: {
          from: "meterreadings",
          localField: "meterReadingId",
          foreignField: "_id",
          as: "meterReading",
        },
      },
      {
        $unwind: "$consumer",
      },
      {
        $unwind: "$meterReading",
      },
      {
        $project: {
          _id: 1,
          billNo: 1,
          billingPeriod: 1,
          consumption: 1,
          rate: 1,
          amount: 1,
          previousBalance: 1,
          totalAmountDue: 1,
          paidAmount: 1,
          dueDate: 1,
          status: 1,
          consumer: {
            _id: "$consumer._id",
            firstName: "$consumer.firstName",
            lastName: "$consumer.lastName",
            consumerId: "$consumer._id",
            status: "$consumer.status",
          },
          meterReading: 1,
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    console.log(bills)

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("consumerId", "firstName lastName consumerId status")
      .populate("meterReadingId");
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("consumerId", "firstName lastName consumerId")
      .populate("meterReadingId");
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/template/html', (req, res) => {
  try {
    const templatePath = path.join(process.cwd(), "templates/billing-statement-template.html");
    res.sendFile(templatePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 });

 router.get("/inquiry/:accountNo", async (req, res) => {
  try {
    const { accountNo } = req.params;
    
    const consumer = await Consumer.findOne({ accountNo });
    if (!consumer) {
      return res.status(404).json({ message: "Account number not found" });
    }

    const bill = await Bill.findOne({ consumerId: consumer._id })
      .sort({ createdAt: -1 })
      .populate("consumerId", "firstName lastName accountNo status")
      .populate("meterReadingId");

    if (!bill) {
      return res.status(404).json({ message: "No bills found for this account" });
    }

    console.log(bill)

    res.json(bill);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
