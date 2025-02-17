const archiveFields = {
  isArchived: {
    type: Boolean,
    default: false
  },
  archivedAt: Date,
  archivedBy: {
    type: String,
    ref: 'User',
    default: "67ac4a5736ca228e4e71f829"
  },
  archiveReason: String
};

const baseOptions = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

module.exports = { archiveFields, baseOptions };