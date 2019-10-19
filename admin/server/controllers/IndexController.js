const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/profile',

  '/owners',
  '/owners/new',
  '/owners/:id',

  '/admins',
  '/admins/new',
  '/admins/:id',

  '/login',

  '/logout',
]

const index = (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/index.html')

  res.sendFile(indexFile);
}

routes.forEach(route => {
  router.get(route, index);
})

router.get('*', (req, res) => res.redirect('/'))

module.exports = router;

