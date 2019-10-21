const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Property = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const Address = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: Address,
    required: true
  },
  phoneLandline: {
    type: String,
    required: true
  },
  phoneMobile: {
    type: String,
    required: true
  },
  property: {
    type: Property,
    required: true
  },
  createdAt: {
    type: Date,
  },
})

schema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
})

schema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

const Owner = mongoose.model('Owner', schema)

module.exports = {Owner, schema}