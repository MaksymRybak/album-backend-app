import mongoose from "mongoose";

// Schema, model
const { Schema, SchemaTypes, model } = mongoose;

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLenght: 50
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLenght: 50
  },
  birthDate: {    // formato standard di una data: YYYY-mm-dd
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  address: String,

  // la relazione con documento Album
  albums: {
    type: [SchemaTypes.ObjectId],
    ref: 'Album'
  }
});

const musicion = model('Musicion', schema);

export default musicion;