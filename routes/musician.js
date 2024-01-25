import express from "express";
import Musician from "../models/musicition.js"
const router = express.Router();

// rotta GET musicions  (lettura di tutti musicion)
router.get('/', async (req, res) => {
  try {
    const musicion = await Musician.find().select('-__v');
    res.send(musicion);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// rotta GET musicions/:id  (ricerca musicion specifico)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const musicion = await Musician.findById(id);
    if (!musicion) {
      res.status(404).send(`Musicion with id ${id} not found`);
    } else {
      res.send(musicion);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// rotta POST musicions (creazione musicion nuovo)
router.post('/', async (req, res) => {
    
  const musicionToCreate = req.body;

  try {
    const musicion = await Musician.create(musicionToCreate);
    res.status(201).send(musicion);
  } catch (err) {    
    res.status(400).send(err.message);
  }

});;

// rotta PUT musicions/:id (aggiornamento musicion specifico)
router.put('/:id', async (req, res) => {
  
  const { id } = req.params;
  const musictionToUpdate = req.body;

  try {
    const musicionUpdated = await Musician.findByIdAndUpdate(id, musictionToUpdate, {
      new: true
    });
    res.send(musicionUpdated);
  } catch (err) {
    res.status(500).send(err.message);
  }

});

// rotta DELETE musicions/:id (eliminazione musicion specifico)
router.delete('/:id', async (req, res) => {
  
  const { id } = req.params;

  try {
    const musicionoToDelete = await Musician.findById(id);
    if (!musicionoToDelete) {
      res.status(404).send(`Musicion with id ${id} not found`);
    } else {
      await Musician.deleteOne({
        _id: id
      });
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

})

export default router;