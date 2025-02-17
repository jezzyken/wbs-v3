const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');

router.get('/', async (req, res) => {
  try {
    const audits = await Audit.find()
      .sort({ createdAt: -1 })
      .populate('changedBy', 'username firstName lastName');
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id)
      .populate('changedBy', 'username firstName lastName');
    if (!audit) return res.status(404).json({ message: 'Audit not found' });
    res.json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;