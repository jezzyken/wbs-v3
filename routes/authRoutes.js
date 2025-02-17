const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      throw new Error("Please provide both username/email and password");
    }

    const userExists = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });

    const user = await User.findByCredentials(username, password);

    console.log(user)

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    user.lastLogin = new Date();
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.passwordResetToken;
    delete userResponse.passwordResetExpires;

    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.log(error, 'error');
    res.status(401).json({ error: error.message });
  }
});

router.post("/verify-token", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ 
      userId: decoded.userId,
      status: "active",
      isArchived: false
    }).select("-password -passwordResetToken -passwordResetExpires");

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.post("/logout", async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;