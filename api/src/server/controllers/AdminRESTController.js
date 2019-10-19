const express = require('express');
const Admin = require('../../database/model/Admin').Admin;
const logger = require('../../logger');
const checkId = require('../services/RequestParamsValidator').checkId;

const router = new express.Router({mergeParams: true});

router.get('/admins', async (req, res) => {

  try {

    const items = await Admin.find().select('-password').sort({createdAt: 'desc'}).lean()

    res.status(200).json({
      count: items.length,
      items,
    })

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.get('/admins/:id', checkId, async (req, res) => {

  try {

    const entity = await Admin.findById(req.params.id).select('-password').lean()
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(entity)

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.delete('/admins/:id', checkId, async (req, res) => {

  try {

    await Admin.deleteOne({_id: req.params.id})

    res.status(204).send()

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.post('/admins', async (req, res) => {

  try {

    const entity = new Admin(req.body)

    const validator = await entity.validate();
    if (validator) {
      res.status(400).json({
        message: 'bad request',
        errors: validator.errors
      })
    }

    await entity.save()

    const content = entity.toObject()

    delete content.password

    res.status(201).json(content)

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.put('/admins/:id', checkId, async (req, res) => {

  try {

    const entity = await Admin.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    entity.set(req.body)

    const validator = await entity.validate();
    if (validator) {
      res.status(400).json({
        message: 'bad request',
        errors: validator.errors
      })
    }

    await entity.save()

    const content = entity.toObject()

    delete content.password

    res.status(200).json(content)

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

module.exports = router;

