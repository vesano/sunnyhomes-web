const express = require('express');
const Owner = require('../../database/model/Owner').Owner;
const logger = require('../../logger');
const checkId = require('../services/RequestParamsValidator').checkId;
const isAdmin = require('../services/AuthService').isAdmin;

const router = new express.Router({mergeParams: true});

router.get('/owners', isAdmin, async (req, res) => {

  try {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let filter = {}

    if (isNaN(page) || page < 0) page = 1
    if (isNaN(limit) || limit < 0) limit = 10

    const skip = limit > 0 && page > 0 ? limit * (page - 1) : 0

    let items = []
    const total = await Owner.countDocuments(filter)
    if (total > 0) {

      items = await Owner.find(filter, null, {skip, limit})
        .select('-password')
        .sort({createdAt: 'desc'})
        .lean()
    }

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
    })

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.get('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Owner.findById(req.params.id).select('-password').lean()
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

router.delete('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    await Owner.deleteOne({_id: req.params.id})

    res.status(204).send()

  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.post('/owners', isAdmin, async (req, res) => {

  try {

    const entity = new Owner(req.body)

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

router.put('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Owner.findById(req.params.id)
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

