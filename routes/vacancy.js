const VacancyController = require('../controllers/vancancy')
const routes = require('express').Router()
const gcsUpload = require('gcs-upload')
const { authentication, authorizationVancancy } = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "./keyfile.json",
        bucketName: "image-bucket-evanskarlin"
    }
})
routes.get('/',VacancyController.findAll)

routes.use(authentication)
routes.post('/', upload.array('imgUrl') ,VacancyController.createVacancy)
routes.get('/:id',VacancyController.findByUserId)
routes.get('/myvacancy',VacancyController.findAllById)
routes.get('/:skill/skill',VacancyController.findBySkill)
routes.patch('/request',VacancyController.updateVacancyRequest)

routes.use('/:id', authorizationVancancy)
routes.put('/:id', upload.array('imgUrl'), VacancyController.updateVacancy)
routes.delete('/:id',VacancyController.delete)
routes.delete('/:id/request',VacancyController.deleteVacancyRequest)
routes.patch('/:id/takenby',VacancyController.updateVacancyTakenBy)
routes.delete('/:id/takenby',VacancyController.deleteVacancyTakenBy)


module.exports = routes