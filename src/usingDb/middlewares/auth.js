import jwt from 'jsonwebtoken';

import secret from '../config/secret';

import db from '../config/db';

/*
*this ensures that routes are guarded with a middleware
*the token is parsed and decoded each time
*/

class Auth {
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token']; 
    if (!token) { 
      res.status(400).json({ status: 400, Message: 'Missing token' });
    } else { 
      jwt.verify(token, secret.secret, (err, result) => { 
        if (err) return res.status(400).json({ status: 400, error: 'Incorrect credentials' });
       
        const queryText = `SELECT * FROM users WHERE id = $1;`;
        const value = [result.userId];

        db.query(queryText, value) 
          .then((response) => { 
            req.user = { id: result.userId };
            next();
          }, (error) => {
            res.status(400).json({ status: 400, error });
          });
      });
    }
  }
}
export default Auth;