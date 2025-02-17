const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { archiveFields, baseOptions } = require('./base/baseSchema');
const auditMiddleware = require('../middleware/auditMiddleware');

const consumerSchema = new Schema({
  accountNo: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
  },
  nameExtension: {
    type: String, 
  },
  fullAddress: {
    type: String,
  },
  purok: {
    type: String,
  },
  contactNumber: String,
  email: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'delinquent', 'disconnected'],
    default: 'active'
  },
  ...archiveFields
}, baseOptions);

consumerSchema.virtual('fullName').get(function() {
  let name = `${this.firstName}`;
  
  if (this.middleName) {
    name += ` ${this.middleName.charAt(0)}.`;
  }
  
  name += ` ${this.lastName}`;
  
  if (this.nameExtension) {
    name += ` ${this.nameExtension}`;
  }
  
  return name;
});

consumerSchema.index({ status: 1 });
consumerSchema.index({ isArchived: 1 });

auditMiddleware(consumerSchema);

const Consumer = mongoose.model('Consumer', consumerSchema);
module.exports = Consumer;