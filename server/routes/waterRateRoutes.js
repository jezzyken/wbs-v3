const express = require('express');
const router = express.Router();
const WaterRateSettings = require('../models/WaterRateSettings');

router.get('/', async (req, res) => {
  try {
    const rates = await WaterRateSettings.find()
      .populate('updatedBy', 'username firstName lastName')
      .sort({ effectiveDate: -1 });
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rate = await WaterRateSettings.findById(req.params.id)
      .populate('updatedBy', 'username firstName lastName');
    if (!rate) return res.status(404).json({ message: 'Water rate not found' });
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const rate = new WaterRateSettings({
      ...req.body,
      updatedBy: req.user.userId
    });
    await rate.save();
    res.status(201).json(rate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const rate = await WaterRateSettings.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.userId },
      { new: true }
    );
    if (!rate) return res.status(404).json({ message: 'Water rate not found' });
    res.json(rate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;