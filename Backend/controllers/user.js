const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Data = require('../data/user');

module.exports = {
  signUp: (req, res) => {
    const userData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
    const user = new User(
      userData.id = Data.length,
      userData.firstName,
      userData.lastName,
      userData.country,
      userData.phoneNumber,
      userData.dateOfBirth,
      userData.gender,
      userData.email,
      userData.password = hash,

    );
    if (!Data.find(newUser => newUser.email === userData.email)) {
      userData.id = Data.length;
      console.log(user);
      Data.push(user);
      const payload = { subject: user.id };
      const token = jwt.sign(payload, 'secretkey');
      res.status(201).json({ token, user, 'status':200, 'message':'Register Successful' });
    } else {

      res.status(401).json({'message':'Email Already Exist', 'status':401});
    }
  },
  
  login: (req, res) => {
    const userData = req.body;
    const evaluateUser = Data.find(dataBaseUser => dataBaseUser.email === userData.email);
    if (!evaluateUser) {
      res.status(401).json({ 'status':401, 'Message':'Email Doesnot Exist'});
    } else{
      if (bcrypt.compareSync(userData.password, evaluateUser.password) === true) {
        const payload = { subject: evaluateUser._id };
        const token = jwt.sign(payload, 'secret');
        const message = 'Login successful';
        const status = 201;
        let data ={
          id :evaluateUser.id,
          firstName : evaluateUser.firstName,
          lastName: evaluateUser.lastName,
          email :evaluateUser.email,
        }
        res.status(201).json({ token,data, message, status });
      }
     else {
      res.status(401).json({ 'status':401, 'Message':'Invalid Password'});
    }
  }
}
}
  

