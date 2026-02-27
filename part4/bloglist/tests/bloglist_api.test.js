const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const userHelper = require('../utils/user_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const getUser = async () => {
  const user = userHelper.validUser
  delete user.name
  const loggedInUser = await api
    .post('/api/login')
    .send(user)
  
  return loggedInUser.body
}

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
  const user = await getUser()
  const blog = listHelper.listWithOneBlog[0]
  await api
    .post('/api/blogs')
    .send(blog)
    .set('Authorization', 'Bearer ' + user.token)
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
  
  const user = await getUser()

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .set('Authorization', 'Bearer ' + user.token)
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

  const user = await getUser()

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .set('Authorization', 'Bearer ' + user.token)
    .expect(400)
})

test('missing url on blog result HTTP 400', async () => {
  const newBlogWithoutUrl = {
    title: 'Testing Missing URL',
    author: 'Tester Dude',
    likes: 0
  }

  const user = await getUser()

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .set('Authorization', 'Bearer ' + user.token)
    .expect(400)
})

describe('test DELETE operation', () => {
  test('with invalid ID', async () => {
    await api
      .delete('/api/blogs/5a422bc61b54a676234d17fd')
      .expect(404)
  })
  
  test('with valid ID', async () => {
    await api
      .delete('/api/blogs/5a422ba71b54a676234d17fb')
      .expect(204)
  })
})

describe('test PUT operation', () => {
  test('with invalid ID', async () => {
    await api
      .put('/api/blogs/5a422bc61b54a676234d17fd')
      .expect(404)
  })
  
  test('with valid ID', async () => {
    const id = "5a422ba71b54a676234d17fb"
    await api
      .put('/api/blogs/' + id)
      .expect(200)
    
    const response = await api.get('/api/blogs')
    const blog = response.body.filter(blog => blog.id === id)

    assert.strictEqual(blog[0].likes, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
