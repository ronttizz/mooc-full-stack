const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const userHelper = require('../utils/user_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating user', () => {
  test('with valid user', async () => {
    await api
      .post('/api/users')
      .send(userHelper.validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('with invalid username', async () => {
    const response = await api
      .post('/api/users')
      .send(userHelper.userWithInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`re`, length 2) is shorter than the minimum allowed length (3).')
  })

  test('with invalid password', async () => {
    const response = await api
      .post('/api/users')
      .send(userHelper.userWithInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, 'password should be at least 3 characters')
  })
  
  test('with duplicate username', async () => {
    await api
      .post('/api/users')
      .send(userHelper.validUser)
    
    const response = await api
      .post('/api/users')
      .send(userHelper.validUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.error, "expected `username` to be unique")
  })
})

after(async () => {
  await mongoose.connection.close()
})
