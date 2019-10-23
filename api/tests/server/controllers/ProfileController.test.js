const {describe, beforeEach, afterEach, it} = require("mocha");
const {boot, expect, tearDown} = require('../../WebTestCase')
const Admin = require('../../../src/database/model/Admin').Admin
const Owner = require('../../../src/database/model/Owner').Owner
const {cid} = require('../../utils')

describe('ProfileController', () => {

  let app

  beforeEach(() => {
    app = boot()
  })

  afterEach(tearDown)

  it('GET /api/v1/profile as Owner is successful', async () => {

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

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        app.get('/api/v1/profile')
          .set('authorization', res.body.token)
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })

  it('POST /api/v1/profile as Owner is successful', async () => {

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

    let body = {
      email: user.email, password: user.password
    };

    await user.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end((err, res) => {

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        body = {
          name: cid(),
          surname: cid(),
        }

        app.post('/api/v1/profile')
          .set('authorization', res.body.token)
          .type('application/json')
          .send(JSON.stringify(body))
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })

  it('GET /api/v1/profile as Admin is successful', async () => {

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

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        app.get('/api/v1/profile')
          .set('authorization', res.body.token)
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })

  it('POST /api/v1/profile as Admin is successful', async () => {

    const user = new Admin({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
    })

    let body = {
      email: user.email, password: user.password
    };

    await user.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end((err, res) => {

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        body = {
          name: cid(),
          surname: cid(),
        }

        app.post('/api/v1/profile')
          .set('authorization', res.body.token)
          .type('application/json')
          .send(JSON.stringify(body))
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })
})