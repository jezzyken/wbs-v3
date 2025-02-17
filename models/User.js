const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const { archiveFields, baseOptions } = require("./base/baseSchema");
const auditMiddleware = require("../middleware/auditMiddleware");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "meter_reader", "collection_officer"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    lastLogin: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    ...archiveFields,
  },
  baseOptions
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.log('Password hashing error:', error);
    next(error);
  }
});

// userSchema.pre("save", async function (next) {
//   if (!this.userId) {
//     try {
//       const lastUser = await this.constructor.findOne({}, {}, { sort: { userId: -1 } });
      
//       if (!lastUser || !lastUser.userId) {
//         this.userId = 'USER-001';
//       } else {
//         const matches = lastUser.userId.match(/\d+$/);
//         const nextId = matches ? parseInt(matches[0]) + 1 : 1;
//         this.userId = `USER-${String(nextId).padStart(3, '0')}`;
//       }
//     } catch (error) {
//       console.error('Error generating userId:', error);
//       this.userId = `USER-${Date.now()}`;
//     }
//   }
//   next();
// });

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    console.log('Comparing passwords...');
    console.log('Candidate password exists:', !!candidatePassword);
    console.log('Stored hash exists:', !!this.password);
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password match result:', isMatch);
    
    return isMatch;
  } catch (error) {
    console.log('Password comparison error:', error);
    throw error;
  }
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 3600000;

  return resetToken;
};

userSchema.statics.findByCredentials = async function (usernameOrEmail, password) {

  console.log(usernameOrEmail)
  const user = await this.findOne({
    $or: [
      { username: usernameOrEmail },
      { email: usernameOrEmail }
    ],
    status: "active",
    isArchived: false,
  });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

userSchema.statics.initializeAdmin = async function () {
  const adminCount = await this.countDocuments({ role: "admin" });

  if (adminCount === 0) {
    const adminUser = new this({
      username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
      password: process.env.DEFAULT_ADMIN_PASSWORD || "adminadmin",
      firstName: "System",
      lastName: "Administrator",
      role: "admin",
      email: process.env.DEFAULT_ADMIN_EMAIL || "admin@app.dev",
      status: "active",
    });

    await adminUser.save();
    console.log("Default admin account created successfully");
    return adminUser;
  }

  return null;
};

userSchema.index({ role: 1 });
userSchema.index({ isArchived: 1 });

auditMiddleware(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
