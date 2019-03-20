import bcrypt from 'bcryptjs';
import db from '../config/db';
import schema from '../model/schema';
import jwt from 'jsonwebtoken';
import Joi from 'joi'
import queries from '../config/queries';
import user from '../../usingObjects/data/user';

export default class LoginController {
    static async login(req, res) {
        try {
            const userData = {};
            userData.email = req.body.email;
            userData.password = req.body.password;
            const {rowCount,rows} = await db.query(queries.checkIfUserExist,[userData.email]);
            console.log(rows)
            if(rowCount===0){
                return res.status(404).json({'status':404,'message':'Email Does not Exist'})
            }else{
               const validPassword = await bcrypt.compareSync(userData.password, rows[0].password)
               if(!validPassword){
                return res.status(401).json({'status':200,'message':'Invalid Password'})
               }else{
                const payload = { subject: userData.email };
                const token = jwt.sign(payload, process.env.SECRET);
                return res.status(200).json({'status':200,token,'message':'Login Successful'})
               }
     
                
            }
                        

            
          
         
        }catch(e){

        }
    }
}