import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const { PEPPER_KEY, JWT_SECRET_KEY } = process.env;

const router = express.Router();

// registrazione utente
router.post('/signup', async (req, res) => {

  const { email, password, nickname } = req.body;

  // TODO validazione:
  // 1. email e password sono stati passati nella req
  // 2. email e' una email valida e non e' stata ancora usata 
  // 3. password sia strong enough 

  const salt = await bcrypt.genSalt(10);
  const passwordWithPepper = password + PEPPER_KEY;
  const passwordHash = await bcrypt.hash(passwordWithPepper, salt);

  try {

    await User.create({
      email,
      password: passwordHash,
      nickname
    });

    res.status(201).send();

  } catch (err) {
    res.status(500).send(err.message);
  }

});

// login utente
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.send('Credenziali mancanti');
  }

  const user = await User.findOne({ email }).select('-__v');

  if (!user) {
    return res.send('Utente non trovato');
  }

  // controllo password fornita
  const passwordWithPepper = password + PEPPER_KEY;

  const match = await bcrypt.compare(passwordWithPepper, user.password);
  if (!match) {
    return res.status(401).send('Utente non autenticato');
  }

  // generazione token JWT
  const payload = {
    id: user._id,
    role: user.role
  };
  const options = {
    expiresIn: '1d'
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, options);

  const userToSend = user.toObject();
  delete userToSend.password;

  // creazione cookie
  let cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,   // 1 day 
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }

  // set cookie
  res.cookie('token', token, cookieOptions);

  // invio risposta
  res.send(userToSend);
});

export default router;
