import Joi from 'joi';

 export default class Validation {
    static userSignUp(user){
        const schema ={
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            country: Joi.string().min(3).required(),
            phoneNumber: Joi.number().min(3).required(),
            gender: Joi.string().min(3).required(),
            email:Joi.string().min(3).required(),
            password: Joi.string().min(3).required()
        }
        return Joi.validate(user,schema);
    }

    static loginUser(user){
        const schema = {
            email:Joi.string().min(3).required(),
            password: Joi.string().min(3).required()
        }
        return Joi.validate(user,schema);
    }

    static message(message){
        const schema ={
            subject:Joi.string().min(3).required(),
            message: Joi.string().min(3).required(),
            recieversEmail:Joi.string()
        }
        return Joi.validate(message,schema);
    }
}


