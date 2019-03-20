import jwt from 'jsonwebtoken';
import db from '../config/db';

const Auth = {
    /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req,res,next){
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(400).send({ 'message': 'Provide Token' });
      }
      try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        const text = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(text, [decoded.email]);
        if(!rows[0]) {
          return res.status(400).send({ 'message': 'The token you provided is invalid' });
        }
        req.user = { email: decoded.email};
        next();
      } catch(error) {
        return res.status(400).send(error);
      }
    }
  }
  
  
  export default Auth;