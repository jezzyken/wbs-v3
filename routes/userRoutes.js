const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, adminAuth } = require("../middleware/auth");
const crypto = require("crypto");

router.get("/me", auth, (req, res) => {
  const userResponse = req.user.toObject();
  delete userResponse.password;
  res.json(userResponse);
});

router.put("/me", async (req, res) => {
  try {
    const allowedUpdates = ["firstName", "lastName", "email", "contactNumber"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    const userResponse = req.user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", auth, adminAuth, async (req, res) => {
  try {
    const { username, email } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      isArchived: false,
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const user = new User(req.body);
    user._user = req.user._id;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const submittedData = req.body;

    const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "contactNumber",
      "role",
      "status",
    ];

    const updates = allowedUpdates.filter((field) => field in submittedData);

    if (updates.length === 0) {
      return res.status(400).json({
        error: "No valid fields to update",
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (submittedData.email && submittedData.email !== user.email) {
      const existingEmail = await User.findOne({
        email: submittedData.email,
        isArchived: false,
        _id: { $ne: req.params.id },
      });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    updates.forEach((field) => {
      user[field] = submittedData[field];
    });

    user._user = req.user.userId;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      const adminCount = await User.countDocuments({
        role: "admin",
        isArchived: false,
        userId: { $ne: user.userId },
      });
      if (adminCount === 0) {
        return res.status(400).json({
          error: "Cannot archive the last admin user",
        });
      }
    }

    await user.archive(req.user.userId, req.body.reason);
    res.json({ message: "User archived successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset-password-request", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      status: "active",
      isArchived: false,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    res.json({
      message: "Password reset instructions sent to email",
      token: resetToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
