import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import data from '../data/user';
export default class LoginController {
  static login(req, res) {
    const userData = req.body;
    let evaluateUser = data.find(dataBaseUser => dataBaseUser.email === userData.email);

    if (evaluateUser) {
      bcrypt.compare(userData.password, evaluateUser.password, (err, result) => {
        if (result === true) {
          const payload = {
            subject: evaluateUser.id
          };
          const token = jwt.sign(payload, 'secret');
          const status = 201;
          res.status(201).json({
            token,
            status
          });
        } else {
          return res.status(401).json({
            'status': 401,
            'message': 'Invalid Password'
          });
        }
      });
    } else {
      return res.status(401).json({
        'status': 401,
        'message': "invalid Email"
      });
    }
  }

}