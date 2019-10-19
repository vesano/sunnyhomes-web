const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {isAdmin, isAuthenticated} = require('./server/services/AuthService');

const LoginController = require('./server/controllers/LoginController');
const OwnerRESTController = require('./server/controllers/OwnerRESTController');
const AdminRESTController = require('./server/controllers/AdminRESTController');
const ProfileController = require('./server/controllers/ProfileController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Public API
app.use('/api/v1', LoginController);

app.use('/api/v1', isAuthenticated, ProfileController);

//Admin API
app.use('/api/v1', isAdmin, OwnerRESTController);
app.use('/api/v1', isAdmin, AdminRESTController);

//Owner API
// app.use('/api/v1', isAdmin, OwnerRESTController);



app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No route found'
  })
});

module.exports = app
