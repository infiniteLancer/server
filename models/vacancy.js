const UserModel = require('./user')
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const VacancySchema = new Schema({
    name : {
        type : String,
        require : [true, 'name is required!'],
    },
    description : {
        type : String,
        required : [true, 'description is required!']
    },
    reference : {
        type : Array,
        validate: {
            validator: function(v) {
                if(v.length > 0){
                    return true
                }
                else{
                    return false
                }
            },
            message: props => `Reference is required`
        }
    },
    skill : {
        type : Array,
        validate: {
            validator: function(v) {
                if(v.length > 0){
                    return true
                }
                else{
                    return false
                }
            },
            message: props => `Requirement is required!`
        }
    },
    deadline : {
        type : Date
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    takenBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    phone : {
        type : String
    },
    request : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }]
})

VacancySchema.pre('save',function(next){
    UserModel.findOne({ _id : this.UserId})
        .then(user=>{
            if (!user.phone) {
                this.phone = 'no phone number please contact by email :)'
                next()
            } else {
                this.phone = user.phone
                next()
            }
        })
        .catch(next)
})

module.exports = model('Vancancy',VacancySchema)