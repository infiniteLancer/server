const router = require('express').Router()
const userRoutes = require('./userRoutes')
// const todoRoutes = require('./todoRoutes')

router.use('/',userRoutes)
// router.use('/todo',todoRoutes)

module.exports = router