const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        const {username,password,email,phone,skill, imgUrl} = req.body
        let portofolio = imgUrl
        User.create({username,password,email,phone,portofolio,skill})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({portofolio})
                // res.status(200).json(result)
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user) {
              if(comparePassword(password,user.password)){
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
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