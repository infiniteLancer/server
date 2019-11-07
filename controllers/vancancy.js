const VacancyModel = require('../models/vacancy')

module.exports = {
    findAll(req,res,next){
        VacancyModel.find()
            .then(vacancy=>{
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    findBySkill(req,res,next){
        const { skill } = req.params
        VacancyModel.find({ skill })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    findByUserId(req,res,next){
        const { UserId } = req.params
        VacancyModel.find({ UserId })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    createVacancy(req,res,next){
        const { id } = req.loginboy
        const { name, description, reference, skill , deadline, phone } = req.body
        const vacancy = { name, description, reference, skill, deadline, phone, UserId }
        VacancyModel.find(vacancy)
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancy(req,res,next){
        const { id } = req.params
        const { name, description, reference, skill , deadline, phone } = req.body
        const vacancy = { name, description, reference, skill, deadline, phone, UserId }
        VacancyModel.findOneAndUpdate({ _id : id }, vacancy, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancyTakenBy(req,res,next){
        const _id = req.params.id
        const takenBy = req.loginboy.id
        const takenBy = { takenBy }
        VacancyModel.findOneAndUpdate({ _id }, takenBy, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancyFavorites(req,res,next){
        const _id = req.params.id
        const favorite = req.loginboy.id
        VacancyModel.findOneAndUpdate({ _id }, { favorite }, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
}