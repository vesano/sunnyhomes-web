const axios = require('axios');
const express = require('express');
const logger = require('../../logger');
const isOwner = require('../services/AuthService').isOwner;
const parameters = require('../../../parameters');

const router = new express.Router({mergeParams: true});

router.get('/booking', isOwner, async (req, res) => {

  try {

    const apartmentId = req.user.user.property.id

    axios.get(`https://login.smoobu.com/api/apartment/${apartmentId}/booking`, {
      headers: {
        "Api-Key": parameters.smoobu.apiKey,
        "Cache-Control": 'no-cache'
      }
    }).then(({data}) => {

      res.status(200).json(data)

    }).catch(e => {

      logger.error(e)

      res.status(500).json(e)

    })


  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

router.post('/booking', isOwner, async (req, res) => {

  try {

    const apartmentId = req.user.property.id

    axios.post(`https://login.smoobu.com/api/apartment/${apartmentId}/booking`, req.body, {
      headers: {
        "Api-Key": parameters.smoobu.apiKey
      }
    }).then(({data}) => {

      res.send(200).json(data)

    }).catch(e => {

      logger.error(e)

      res.send(500).json(e)

    })


  } catch (e) {

    logger.error(e);

    res.status(e.code > 400 ? e.code : 500).json(e)
  }
})

module.exports = router;

