const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
  collectionName: {
    type: String,
    required: true
  },
  documentId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  action: {
    type: String,
    enum: ['create', 'update', 'archive', 'restore'],
    required: true
  },
  previousState: Schema.Types.Mixed,
  newState: Schema.Types.Mixed,
  changedBy: {
    type: String,
    ref: 'User',
    required: true
  },
  changeReason: String
}, {
  timestamps: true
});

auditSchema.index({ collectionName: 1, documentId: 1 });
auditSchema.index({ changedBy: 1 });
auditSchema.index({ createdAt: -1 });

const Audit = mongoose.model('Audit', auditSchema);
module.exports = Audit;