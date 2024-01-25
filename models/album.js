import mongoose from "mongoose";

// Schema, model
const { Schema, SchemaTypes, model } = mongoose;

// definizione dello schema del nostro Album
const schema = new Schema({
  title: String,
  year: Number,
  description: String,
  
  // relazione con il documento Musicion
  musicion: {
    type: SchemaTypes.ObjectId,
    ref: 'Musicion'
  }
  
});

// creazione del modello partendo dallo Schema
const album = model('Album', schema);

export default album;