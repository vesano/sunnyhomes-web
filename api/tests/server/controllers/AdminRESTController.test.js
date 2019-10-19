const {describe, beforeEach, afterEach, it} = require("mocha");
const {boot, expect, tearDown} = require('../../WebTestCase')
const Admin = require('../../../src/database/model/Admin').Admin
const {cid} = require('../../utils')

describe('AdminRESTController', () => {

  let app

  beforeEach(() => {
    app = boot()
  })

  afterEach(tearDown)

  it('GET /api/v1/admins as Admin is successful', async () => {

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

        app.get('/api/v1/admins')
          .set('authorization', res.body.token)
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
            expect(res.body.items).not.to.equal(undefined)
            expect(res.body.count).not.to.equal(undefined)
          });

      });
  })

  it('POST /api/v1/admins as Admin is successful', async () => {

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
            id: cid(),
            name: cid(),
          }
        }

        app.post('/api/v1/admins')
          .set('authorization', res.body.token)
          .type('application/json')
          .send(JSON.stringify(body))
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(201)
          });

      });
  })

  it('PUT /api/v1/admins/:id as Admin is successful', async () => {

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

    const admin = new Admin({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
    })

    await admin.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end(async (err, res) => {

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        app.put(`/api/v1/admins/${admin._id}`)
          .set('authorization', res.body.token)
          .type('application/json')
          .send(JSON.stringify({
            name: cid()
          }))
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })

  it('DELETE /api/v1/admins/:id as Admin is successful', async () => {

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

    const admin = new Admin({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
    })

    await admin.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end(async (err, res) => {

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        app.del(`/api/v1/admins/${admin._id}`)
          .set('authorization', res.body.token)
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(204)
          });

      });
  })

  it('GET /api/v1/admins/:id as Admin is successful', async () => {

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

    const admin = new Admin({
      email: cid(),
      password: cid(),
      name: cid(),
      surname: cid(),
    })

    await admin.save()

    app.post('/api/v1/login')
      .type('application/json')
      .send(JSON.stringify(body))
      .end(async (err, res) => {

        if (err) throw err

        expect(res.statusCode).to.equal(200)
        expect(res.body.token).not.to.equal(undefined)

        app.get(`/api/v1/admins/${admin._id}`)
          .set('authorization', res.body.token)
          .end((err, res) => {

            if (err) throw err

            expect(res.statusCode).to.equal(200)
          });

      });
  })
})