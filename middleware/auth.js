import jwt from 'jsonwebtoken';
import User from "../models/user.js";

const { JWT_SECRET_KEY } = process.env;

export const requireAuth = () => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        throw new Error('Token mancante');
      }

      const { id } = jwt.verify(token, JWT_SECRET_KEY);
      const user = await User.findById(id);

      if (!user) {
        throw new Error('Utente non trovato');
      }

      req.user = user;
    } catch (error) {
      console.error(error);
      return res.status(401).send(`Utente non autorizzato`);
    }

    next();
  }
}