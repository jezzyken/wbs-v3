const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    console.log({user})
    console.log({decoded})
    console.log(decoded.userId)

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const adminAuth = (req, res, next) => {
  console.log(req.user)
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

module.exports = { auth, adminAuth };