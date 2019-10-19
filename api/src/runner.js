const logger = require('./logger')
const parameters = require('../parameters')
const Admin = require('../src/database/model/Admin').Admin
const Owner = require('../src/database/model/Owner').Owner

logger.info(`Starting app in ${process.env.NODE_ENV} environment...`)

// process.on('unhandledRejection', (reason, p) => {
//   logger.error(
//     "Unhandled Rejection at:\r\n"
//     + "Promise:\r\n" + JSON.stringify(p)
//     + "\r\nReason:\r\n" + JSON.stringify(reason)
//   )
// })

const db = require('./database/mongo');

db.connect()

const server = require('./index');

server.listen(parameters.port, async () => {
  logger.info('Server started')

  const admin = new Admin({
    email: 'admin',
    password: 'admin',
    name: 'admin',
    surname: 'admin',
  })

  try {
    await admin.save()
  } catch (ignore) {

  }

  const owner = new Owner({
    email: 'owner',
    password: 'owner',
    name: 'owner',
    surname: 'owner',

    phoneLandline: '+3800 000 00 00',
    phoneMobile: '+3800 100 00 00',

    address: {
      zip: '00000',
      country: 'There',
      city: 'Here',
      address: 'That',
    },

    property: {
      id: 215077,
      name: 'Owner property'
    }
  })

  try {
    await owner.save()
  } catch (ignore) {

  }
})