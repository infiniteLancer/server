const router = require('express').Router()
const UserController = require('../controllers/UserController')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: "./keyfile.json",
    bucketName: "image-bucket-evanskarlin"
  }
})

router.get('/allUser',UserController.findAll)
router.post('/register', upload.array('imgUrl'), UserController.register)
router.post('/login', UserController.login)

module.exports = router