const { test, beforeEach, after } = require('node:test')
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

test('add new blog to list', async () => {
  const blog = listHelper.listWithOneBlog[0]
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, listHelper.blogs.length + 1)
})

test('missing likes property defaults to 0', async () => {
  const newBlogWithoutLikes =   {
    title: 'Test blog without likes',
    author: 'Tester Dude',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.likes, 0)
})

test('missing title on blog result HTTP 400', async () => {
  const newBlogWithoutTitle = {
    author: 'Tester Dude',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
})

test('missing url on blog result HTTP 400', async () => {
  const newBlogWithoutUrl = {
    title: 'Testing Missing URL',
    author: 'Tester Dude',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
