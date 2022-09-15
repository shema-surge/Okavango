const {Router} = require('express')
const { createUser, login, logout } = require('../controllers/users')
const { checkAuth } = require('../middleware/auth')

const router = Router()

router.post('/register',createUser)

router.post('/login',login)

router.post('/logout',checkAuth,logout)

module.exports = router