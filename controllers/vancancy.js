const VacancyModel = require('../models/vacancy')
const nodemailer = require('../helpers/mailer')

module.exports = {
    findAll(req,res,next){
        VacancyModel.find()
            .then(vacancy=>{
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    findAllById(req,res,next){
        let { _id } = req.loggedUser
        VacancyModel.find({ _id })
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
        const { _id } = req.loggedUser
        const { name, description, skill , deadline, phone, imgUrl } = req.body
        let reference = imgUrl
        let UserId = _id
        const vacancy = { name, description, reference, skill, deadline, phone, UserId }
        VacancyModel.create(vacancy)
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`create vacancy success! at ${new Date()}`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancy(req,res,next){
        const { id } = req.params
        console.log(id, 'params');
        const { name, description, skill , deadline, phone, imgUrl } = req.body
        let reference = imgUrl
        const vacancy = { name, description, reference, skill, deadline, phone }
        VacancyModel.findOneAndUpdate({ _id : id }, vacancy, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`update vacancy success! at ${new Date()} [ ${vacancy.name} - ${vacancy.description} - ${vacancy.deadline}]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancyRequest(req,res,next){
        const { _id } = req.loggedUser
        const { id } = req.body
        VacancyModel.findOneAndUpdate({ _id : id }, {$addToSet : { request : _id } }, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`request is success! at ${new Date()} [ ${vacancy.name} ]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    deleteVacancyRequest(req,res,next){
        const { _id } = req.body
        const { id } = req.params
        VacancyModel.findOneAndUpdate({ _id : id }, {$pull : { request : _id } }, { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`request delete is success! at ${new Date()} [ ${vacancy.name} ]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    updateVacancyTakenBy(req,res,next){
        const { id } = req.params
        const { _id } = req.body
        VacancyModel.findOneAndUpdate({ _id : id }, {$addToSet : { takenBy : _id }} , { new : true })
            .populate('takenBy')
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`vacancy taken! at ${new Date()} [ ${vacancy.name} ]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    deleteVacancyTakenBy(req,res,next){
        const { id } = req.params
        const { _id } = req.body
        VacancyModel.findOneAndUpdate({ _id : id }, {$pull: { takenBy : _id }} , { new : true })
            .then(vacancy=>{
                if(!vacancy) throw { message : 'ga ada guys'}
                nodemailer(req.loggedUser.email,`im sorry you have been issued by owner in this project! at ${new Date()} [ ${vacancy.name} ]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    },
    delete(req,res,next){
        const { id } = req.params
        VacancyModel.findOneAndDelete({ _id : id })
            .then(vacancy=>{
                nodemailer(req.loggedUser.email,`delete project is success! at ${new Date()} [ ${vacancy.name} ]`)
                res.status(200).json(vacancy)
            })
            .catch(next)
    }
}
