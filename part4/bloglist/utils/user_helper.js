const mongoose = require('mongoose')
const User = require('../models/user')

const validUser = {
  "username": "test",
  "name": "Tester Dude",
  "password": "salainen"
}

const userWithInvalidUsername = {
  "username": "re",
  "name": "Tester Dude",
  "password": "salainen"
}

const userWithInvalidPassword = {
  "username": "test",
  "name": "Tester Dude",
  "password": "re"
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  validUser,
  userWithInvalidUsername,
  userWithInvalidPassword,
  usersInDb
}