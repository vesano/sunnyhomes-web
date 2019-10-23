const {describe, beforeEach, afterEach, it} = require("mocha");
const {boot, expect, tearDown} = require('../../WebTestCase')
const Admin = require('../../../src/database/model/Admin').Admin
const Owner = require('../../../src/database/model/Owner').Owner
const {cid} = require('../../utils')

describe('LoginController', () => {

  let app

  beforeEach(() => {
    app = boot()
  })

  afterEach(tearDown)

  it('POST /api/v1/login as Admin is successful', async () => {

    const user = new Admin({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
    })

    const body = {
      email: user.email, password: user.password
    };

    await user.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end((err, res) => {

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)
        expect(res.body.user).not.to.equal(undefined)
        expect(res.body.user.email).to.equal(user.email)
      });
  })

  it('POST /api/v1/login as Owner is successful', async () => {

    const user = new Owner({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
      phoneLandline: cid(),
      phoneMobile: cid(),
      address: {
        zip: cid(),
        country: cid(),
        city: cid(),
        address: cid(),
      },
      property: {
        propertyId: cid(),
        name: cid(),
      }
    })

    const body = {
      email: user.email, password: user.password
    };

    await user.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end((err, res) => {

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)
        expect(res.body.user).not.to.equal(undefined)
        expect(res.body.user.email).to.equal(user.email)
      });
  })
})