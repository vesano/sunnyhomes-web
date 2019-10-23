const axios = require('axios');
const express = require('express');
const isOwner = require('../services/AuthService').isOwner;
const ErrorHandler = require('../services/ErrorHandler');
const parameters = require('../../../parameters');

const router = new express.Router({mergeParams: true});

router.get('/booking', isOwner, async (req, res) => {

  try {

    const apartmentId = req.user.user.property.propertyId

    axios.get(`https://login.smoobu.com/api/apartment/${apartmentId}/booking`, {
      headers: {
        "Api-Key": parameters.smoobu.apiKey,
        "Cache-Control": 'no-cache'
      }
    }).then(({data}) => {

      res.status(200).json(data)

    }).catch(e => {
      res.status(e.response.status).json(e.response.data)
    })


  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/booking/:id', isOwner, async (req, res) => {

  try {

    const apartmentId = req.user.user.property.propertyId
    const bookingId = req.params.id

    axios.delete(`https://login.smoobu.com/api/apartment/${apartmentId}/booking/${bookingId}`, {
      headers: {
        "Api-Key": parameters.smoobu.apiKey,
        "Cache-Control": 'no-cache'
      }
    }).then(() => {

      res.status(204).send()

    }).catch(e => {
      res.status(e.response.status).json(e.response.data)
    })


  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/booking', isOwner, async (req, res) => {

  try {

    const owner = req.user.user;

    const apartmentId = owner.property.propertyId
    const channelId = owner.property.channelId

    const data = {
      channelId,
      arrivalDate: req.body.arrivalDate,
      departureDate: req.body.departureDate,
      email: owner.email,
      phone: owner.phoneMobile || owner.phoneLandline,
      firstName: owner.name,
      lastName: owner.surname,
      address: {
        location: owner.address.address,
        postalCode: owner.address.zip,
      },
      country: owner.address.country,
      notice: '[Sunnyhomes] Reservation by owner'
    }

    axios.post(`https://login.smoobu.com/api/apartment/${apartmentId}/booking`, data, {
      headers: {
        "Api-Key": parameters.smoobu.apiKey,
        "Content-Type": 'application/json',
        "Cache-Control": 'no-cache'
      }
    }).then(({data}) => {

      res.status(201).json(data)

    }).catch(e => {
      res.status(e.response.status).json(e.response.data)
    })


  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

