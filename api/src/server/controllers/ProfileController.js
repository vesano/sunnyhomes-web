const express = require('express');
const Owner = require('../../database/model/Owner').Owner;
const Admin = require('../../database/model/Admin').Admin;
const logger = require('../../logger');

const router = new express.Router({mergeParams: true});

router.get('/profile', async (req, res) => {

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

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.post('/profile', async (req, res) => {

  try {

    if (req.user.isOwner) {

      const owner = await Owner.findById(req.user.user._id).select('-password')
      if (owner) {

        delete req.body.password
        delete req.body.property

        owner.set(req.body)

        const validator = await owner.validate();
        if (validator) {
          res.status(400).json({
            message: 'bad request',
            errors: validator.errors
          })
        }

        await owner.save()

        res.status(200).json(owner.toObject())

      }
    }

    if (req.user.isAdmin) {

      const admin = await Admin.findById(req.user.user._id).select('-password')
      if (admin) {

        delete req.body.password

        admin.set(req.body)

        const validator = await admin.validate();
        if (validator) {
          res.status(400).json({
            message: 'bad request',
            errors: validator.errors
          })
        }

        await admin.save()

        res.status(200).json(admin.toObject())

      }
    }

    res.status(404).json({
      message: 'No user found by email/password'
    })

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

module.exports = router;

