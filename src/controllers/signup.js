import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../model/user'
import data from '../data/user';



export default class SignUpController{
    static signup (req,res){
        const userData = req.body;
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(userData.password, salt);
        const user = new User(
          userData.id = data.length,
          userData.firstName,
          userData.lastName,
          userData.country,
          userData.phoneNumber,
          userData.dateOfBirth,
          userData.gender,
          userData.email,
          userData.password,
    
        );
        
   
     
        // const userData = {};
        // userData.id = data.length;
        // userData.firstName = req.body.firstName;
        // userData.lastName = req.body.lastName;
        // userData.email = req.body.email;
        // userData.phoneNumber = req.body.phoneNumber;
        // userData.country = req.body.country;
        // userData.gender = req.body.gender
        // userData.password =hash
          
      
        
        

        if (!data.find(newUser => newUser.email === userData.email)) {
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                         
                        console.log(hash);
                         user.password = hash;
                        data.push(user);
                        console.log(user);
                        const payload = { subject: user._id };
          const token = jwt.sign(payload, 'secretkey');

          
        return res.status(201).json({'status':201, user, 'message':'Register Successful' });
                });
            });
        
           
          
        } else {
    
        return res.status(401).json({'message':'Email Already Exist', 'status':401});
        }
    
   }
    }