const express = require('express');
const Owner = require('../../database/model/Owner').Owner;
const Admin = require('../../database/model/Admin').Admin;
const logger = require('../../logger');
const AuthService = require('../services/AuthService')

const router = new express.Router({mergeParams: true});

router.post('/login', async (req, res) => {

  try {

    const {password, email} = req.body

    if (!(email && password)) {
      res.status(400).json({
        message: 'Bad request'
      })
    }

    const owner = await Owner.findOne({email})
    if (owner) {
      if (owner.comparePassword(password)) {

        const user = owner.toObject()

        delete user.password

        const token = AuthService.generateAuthToken({
          isOwner: true, user
        })

        res.status(200).json({
          user,
          token
        })
      } else {
        res.status(401).json({
          message: 'Bad credentials'
        })
      }
    }

    const admin = await Admin.findOne({email})
    if (admin) {
      if (admin.comparePassword(password)) {

        const user = admin.toObject()

        delete user.password

        const token = AuthService.generateAuthToken({
          isAdmin: true, user
        })

        res.status(200).json({
          user,
          token
        })
      } else {
        res.status(401).json({
          message: 'Bad credentials'
        })
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

router.post('/login-check', async (req, res) => {

  try {

    const token = req.body.token
    if (!token) {
      res.status(400).json({
        message: 'Bad request'
      })
      return
    }

    const content = AuthService.verifyToken(token)
    if (!content) {
      res.status(403).json({
        message: "Access denied"
      });
      return
    }

    res.status(200).json({
      user: content.user,
      token
    })

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

module.exports = router;

