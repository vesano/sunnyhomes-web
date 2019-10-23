const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Property = new mongoose.Schema({
  propertyId: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
})

const Address = new mongoose.Schema({
  address: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
})

const schema = new mongoose.Schema({
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
  name: {
    type: String,
    required: false
  },
  surname: {
    type: String,
    required: false
  },
  address: {
    type: Address,
    required: false
  },
  phoneLandline: {
    type: String,
    required: false
  },
  phoneMobile: {
    type: String,
    required: false
  },
  property: {
    type: Property,
    required: false
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