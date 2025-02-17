const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Consumer = require('../models/Consumer');
const MeterReading = require('../models/MeterReading');
const Expense = require('../models/Expense');

// Get dashboard summary
router.get('/summary', async (req, res) => {
  try {
    // Get counts and summaries
    const [
      totalConsumers,
      activeConsumers,
      totalUnpaidBills,
      totalOverdueBills,
      currentMonthReadings,
      monthlyExpenses
    ] = await Promise.all([
      Consumer.countDocuments(),
      Consumer.countDocuments({ status: 'active' }),
      Bill.countDocuments({ status: 'unpaid' }),
      Bill.countDocuments({ status: 'overdue' }),
      MeterReading.countDocuments({
        readingDate: {
          $gte: new Date(new Date().setDate(1)),
          $lte: new Date()
        }
      }),
      Expense.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ])
    ]);

    res.json({
      totalConsumers,
      activeConsumers,
      totalUnpaidBills,
      totalOverdueBills,
      currentMonthReadings,
      monthlyExpenses: monthlyExpenses[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monthly collections summary
router.get('/collections', async (req, res) => {
  try {
    const collections = await Bill.aggregate([
      {
        $match: {
          status: 'paid',
          paidAmount: { $gt: 0 }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$updatedAt' },
            month: { $month: '$updatedAt' }
          },
          total: { $sum: '$paidAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get consumer status distribution
router.get('/consumer-status', async (req, res) => {
  try {
    const statusDistribution = await Consumer.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(statusDistribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expense summary by type
router.get('/expenses', async (req, res) => {
  try {
    const expenseSummary = await Expense.aggregate([
      {
        $group: {
          _id: '$expenseType',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json(expenseSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent activities
router.get('/recent-activities', async (req, res) => {
  try {
    const [recentBills, recentReadings] = await Promise.all([
      Bill.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('consumerId', 'firstName lastName'),
      MeterReading.find()
        .sort({ readingDate: -1 })
        .limit(5)
        .populate('consumerId', 'firstName lastName')
    ]);

    res.json({
      recentBills,
      recentReadings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;