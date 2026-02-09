const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  
  test('of a bigger lis is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    assert.deepStrictEqual(result, listHelper.listWithOneBlog[0])
  })
  
  test('of a bigger lis is calculated right', () => {
    const result = listHelper.favoriteBlog(listHelper.blogs)
    assert.strictEqual(result, listHelper.blogs[2])
  })
})
