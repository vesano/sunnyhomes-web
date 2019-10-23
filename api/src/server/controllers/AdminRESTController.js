const express = require('express');
const Admin = require('../../database/model/Admin').Admin;
const AdminService = require('../services/AdminService');
const ErrorHandler = require('../services/ErrorHandler');
const isAdmin = require('../services/AuthService').isAdmin;
const checkId = require('../services/RequestParamsValidator').checkId;

const router = new express.Router({mergeParams: true});

router.get('/admins', isAdmin, async (req, res) => {

  try {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let filter = {}

    if (isNaN(page) || page < 0) page = 1
    if (isNaN(limit) || limit < 0) limit = 10

    let items = []
    const total = await AdminService.countByFilter(filter)
    if (total > 0) {
      items = await AdminService.findByFilter(filter, page, limit)
    }

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/admins/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await AdminService.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(AdminService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/admins/:id', isAdmin, checkId, async (req, res) => {

  try {

    await AdminService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/admins', isAdmin, async (req, res) => {

  try {

    const result = await AdminService.create(req.body)

    res.status(201).json(AdminService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/admins/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Admin.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await AdminService.update(entity, req.body)

    res.status(200).json(AdminService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

