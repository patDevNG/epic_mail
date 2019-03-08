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
  }
}
  