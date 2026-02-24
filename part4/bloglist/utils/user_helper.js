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

module.exports = {
  validUser,
  userWithInvalidUsername,
  userWithInvalidPassword
}