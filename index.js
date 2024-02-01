// TODO: rotter per le operazioni CRUD per  
//      - albums 
//          * GET albums                  (lettura di tutti album)
//          * GET albums/:id              (ricerca album specifico)
//          * POST albums                 (creazione album nuovo)
//          * PUT albums/:id              (aggiornamento album specifico)
//          * DELETE albums/:id           (eliminazione album specifico)
//      - musicians

// rotte REST -> GET, POST, PUT, PATCH, DELETE

import express from "express";
import dotenv from "dotenv";
import albumRouter from "./routes/album.js";
import musicionRouter from "./routes/musician.js";
import userRouter from "./routes/user.js";
import userProtectedRouter from "./routes/user-protected.js";
import { requireAuth } from "./middleware/auth.js";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const { MONGO_URI } = process.env;
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());      // middleware per deserializzare/serializzare stringhe JSON
app.use(cookieParser());      // middleware per gestire i cookie

// configurazione CORS per poter gestire correttamente Cookie
app.use(cors(
  {
    origin: 'http://localhost:5173',    // TODO: aggiungere indirizzo del front-end pubblicato su Vercel
    credentials: true
  }
));

app.use('/users', userRouter);

app.use(requireAuth());

app.use('/users', userProtectedRouter);

app.use('/albums', albumRouter);
app.use('/musicions', musicionRouter);

mongoose.connect(MONGO_URI)   // 1. connessione a MongoDB
  .then(() => {

    console.log('Connected to MondoDB');

    app.listen(EXPRESS_PORT, () => {    // 2. avvio server express
      console.log(`Server started on port ${EXPRESS_PORT}`);
    });

  })
  .catch((err) => console.error('Error connection to MongoDB', err));

export default app;