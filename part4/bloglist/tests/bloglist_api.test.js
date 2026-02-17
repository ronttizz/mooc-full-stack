const { test, beforeEach, after, expect } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.blogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, listHelper.blogs.length)
})

test('all blogs have id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert.strictEqual(Object.hasOwn(blog, 'id'), true)
    assert.strictEqual(Object.hasOwn(blog, '_id'), false)
  })
})

after(async () => {
  await mongoose.connection.close()
})
