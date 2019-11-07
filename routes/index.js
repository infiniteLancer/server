const router = require('express').Router()
const userRoutes = require('./userRoutes')
const vacancyRoutes = require('./vacancy')

router.use('/',userRoutes)
router.use('/vacancy',vacancyRoutes)

module.exports = router