const mongoose = require("mongoose");
const Audit = require("../models/Audit");

const auditMiddleware = (schema) => {
  schema
    .virtual("_user")
    .get(function () {
      return this.__user;
    })
    .set(function (v) {
      this.__user = v;
    });

  schema
    .virtual("_reason")
    .get(function () {
      return this.__reason;
    })
    .set(function (v) {
      this.__reason = v;
    });

  schema.pre("save", function (next) {
    this._original = this.isNew ? null : this.toObject();
    next();
  });

  schema.post("save", async function (doc) {
    if (!doc._user) return;

    const action = doc.isNew ? "create" : "update";
    await Audit.create({
      collectionName: doc.constructor.modelName,
      documentId: doc._id,
      action,
      previousState: doc._original,
      newState: doc.toObject(),
      changedBy: doc._user,
      changeReason: doc._reason,
    });
  });

  schema.methods.archive = async function (userId, reason) {
    this._user = userId;
    this._reason = reason;

    const previousState = this.toObject();

    this.isArchived = true;
    this.archivedAt = new Date();
    this.archivedBy = userId;
    this.archiveReason = reason;

    await this.save();

    await Audit.create({
      collectionName: this.constructor.modelName,
      documentId: this._id,
      action: "archive",
      previousState,
      newState: this.toObject(),
      changedBy: userId,
      changeReason: reason,
    });
  };

  schema.methods.restore = async function (userId, reason) {
    this._user = userId;
    this._reason = reason;

    const previousState = this.toObject();

    this.isArchived = false;
    this.archivedAt = null;
    this.archivedBy = null;
    this.archiveReason = null;

    await this.save();

    await Audit.create({
      collectionName: this.constructor.modelName,
      documentId: this._id,
      action: "restore",
      previousState,
      newState: this.toObject(),
      changedBy: userId,
      changeReason: reason,
    });
  };

  schema.pre("find", function () {
    if (!this.getQuery().includeArchived) {
      this.where({ isArchived: false });
    }
  });

  schema.pre("findOne", function () {
    if (!this.getQuery().includeArchived) {
      this.where({ isArchived: false });
    }
  });

  schema.statics.findWithArchived = function () {
    return this.find().where({ includeArchived: true });
  };
};

module.exports = auditMiddleware;
