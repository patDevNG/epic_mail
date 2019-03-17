import bcrypt from 'bcryptjs';
import db from '../config/db';

export default class SignUpController{
 static signUp(req,res){
     res.send('Singin Works');
 }
}