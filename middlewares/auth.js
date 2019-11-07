const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')
const Vancancy = require('../models/vacancy')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken._id)
            .then(user => {
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}

function authorizationVancancy(req, res, next){
    Vancancy.findById(req.params.id)
        .then(vancancy => {
            if(!vancancy){
                next({ status: 404, message: 'Not Found' })
            }
            else if(vancancy.UserId == req.loggedUser._id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}

module.exports = {authentication, authorizationVancancy} 