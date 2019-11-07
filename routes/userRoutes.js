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

router.post('/register', upload.array('imgUrl'), UserController.register)
router.post('/login', UserController.login)
router.post('/test', upload.array('imgUrl'), (req, res, next) => {
  res.status(200).json(req.body)
  
})


module.exports = router