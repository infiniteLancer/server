const VacancyController = require('../controllers/vancancy')
const routes = require('express').Router()

// AUTHENTIKASI
routes.get('/',VacancyController.findAll)
routes.get('/',VacancyController.findBySkill)
routes.get('/:id',VacancyController.findByUserId)
// AUTHORISASI
routes.post('/',VacancyController.createVacancy)
routes.put('/',VacancyController.updateVacancy)
routes.patch('/takenby',VacancyController.updateVacancyTakenBy)
routes.patch('/favorites',VacancyController.updateVacancyFavorites)

module.exports = routes