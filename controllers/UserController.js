const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const nodemailer = require('../helpers/mailer')

class UserController {
    static register (req,res,next) {
        const {username,password,email,phone,skill, imgUrl} = req.body
        let portofolio = imgUrl
        User.create({username,password,email,phone,portofolio,skill})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                nodemailer(payload.email,`thanks for registration! at ${new Date()}`)
                res.status(200).json({token, username:result.username})
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
          console.log(email);
          
            if(user) {
              if(comparePassword(password,user.password)){
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
                nodemailer(payload.email,`your account login! at ${new Date()}`)
                res.status(200).json({token, username:user.username})
              }
              else{
                next({ status:400, message:'Wrong Password' })
              }
            } else {
              next({ status:404, message:'Email Not Found' })
            }
        })
        .catch(next)
    }

    static findAll(req,res,next){
        User.find()
          .then(user=>{
            res.status(200).json(user)
          })
          .catch(next)
    }
}

module.exports = UserController