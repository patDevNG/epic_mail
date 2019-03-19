import bcrypt from 'bcryptjs';
import db from '../config/db';
import joi from 'joi';
import schema from '../model/schema';
import jwt from 'jsonwebtoken';
import queries from '../config/queries'
import dbhelpers from '../config/dbhelpers'

/**
this enables new user to be able to signup
* @param {Object} req- request from the client side
* @param {Object} res -response from the backend
*@returns {Object} a message which can be success or error
*/

export default class SignUpController {
    static async signUp(req, res) {
      
         try {
            const validateUser = schema.userSignUp(req.body)
            if (validateUser.error === null) {
                const userData = {};
                userData.firstName = req.body.firstName;
                userData.lastName = req.body.lastName;
                userData.country = req.body.country;
                userData.phoneNumber = req.body.phoneNumber;
                userData.gender = req.body.gender;
                userData.email = req.body.email;
                userData.password = req.body.password
                console.log(userData);
        const{ rowCount} = await db.query(queries.checkIfUserExist,[userData.email]);
                
                if(rowCount ===0){
                    let salt = await bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(userData.password, salt);
                    userData.password = hash
                    const userTableValue =[userData.firstName, userData.lastName, userData.country,
                        userData.phoneNumber, userData.gender,userData.email, userData.password]
                    const AddingUser = await db.query(queries.insertUsers,userTableValue);
        
                    const payload = { subject: userData.id };
                const token = jwt.sign(payload, 'secretkey');
                return res.status(201).json({'status':201, token, 'message':`Welcome ${userData.firstName}`});
                }else{
                    return res.status(401).json({'status':400, 'message':'Email Already Exist'})
                }
                
              } else{
                return res.status(400).json({'status':400, 'message':'Check your input'}) 
            }
            
            
         }
         catch(e){
           
         }


   }
}

