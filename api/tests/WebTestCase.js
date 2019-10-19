const chai = require('chai')
const chaiHttp = require('chai-http')

const db = require('../src/database/mongo')
const server = require('../src')

chai.use(chaiHttp);

db.connect()

module.exports = {
  tearDown: (done) => {
    done()
  },
  boot: () => {
    return chai.request(server)
  },
  server,
  db,
  expect: chai.expect
}