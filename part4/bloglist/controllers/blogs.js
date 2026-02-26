const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userHelper = require('../utils/user_helper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    
    return response.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).end()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    } else {
      if (decodedToken.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
      } else {
        return response.status(401).json({ error: 'you can\'t delete blog that is not yours' })
      }
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).end()
    } else {
      await Blog.findByIdAndUpdate({_id: request.params.id}, {$set: {likes: blog.likes + 1}})
      return response.status(200).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
