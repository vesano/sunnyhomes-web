const express = require('express');
const Owner = require('../../database/model/Owner').Owner;
const Admin = require('../../database/model/Admin').Admin;
const isAuthenticated = require('../services/AuthService').isAuthenticated;
const AdminService = require('../services/AdminService');
const OwnerService = require('../services/OwnerService');
const ErrorHandler = require('../services/ErrorHandler');

const router = new express.Router({mergeParams: true});

router.get('/profile', isAuthenticated, async (req, res) => {

  try {

    if (req.user.isOwner) {

      const owner = await Owner.findById(req.user.user._id).select('-password').lean()
      if (owner) {
        res.status(200).json(owner)
      }
    }

    if (req.user.isAdmin) {

      const admin = await Admin.findById(req.user.user._id).select('-password').lean()
      if (admin) {
        res.status(200).json(admin)
      }
    }

    res.status(404).json({
      message: 'No user found by email/password'
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/profile', isAuthenticated, async (req, res) => {

  try {

    if (req.user.isOwner) {

      const owner = await Owner.findById(req.user.user._id).select('-password')
      if (owner) {

        delete req.body.property

        const result = await OwnerService.update(owner, req.body)

        res.status(200).json(OwnerService.serialize(result))

      }
    }

    if (req.user.isAdmin) {

      const admin = await Admin.findById(req.user.user._id).select('-password')
      if (admin) {

        const result = await AdminService.update(admin, req.body)

        res.status(200).json(AdminService.serialize(result))

      }
    }

    res.status(404).json({
      message: 'No user found by email/password'
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

