import express from "express";
import Album from "../models/album.js";

const router = express.Router();

// rotta GET albums  (lettura di tutti album)
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find()
      .populate('musicion', 'firstName lastName')
      .select('-__v');

    res.send(albums);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// rotta GET albums/:id  (ricerca album specifico)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id).populate('musicion', '-__v');
    if (!album) {
      res.status(404).send(`Album with id ${id} not found`);
    } else {
      res.send(album);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

});

// rotta POST albums (creazione album nuovo)
router.post('/', async (req, res) => {
  const albumToCreate = req.body;

  try {
    const album = await Album.create(albumToCreate);
    res.status(201).send(album);
  } catch (err) {
    res.status(500).send(err.message);
  }

});;

// rotta PUT albums/:id (aggiornamento album specifico)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const albumToUpdate = req.body;

  try {
    const albumUpdated = await Album.findByIdAndUpdate(id, albumToUpdate, {
      new: true
    });
    res.send(albumUpdated);
  } catch (err) {
    res.status(500).send(err.message);
  }

});

// rotta DELETE albums/:id (eliminazione album specifico)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const albumToDelete = await Album.findById(id);
    if (!albumToDelete) {
      res.status(404).send(`Album with id ${id} not found`);
    } else {
      await Album.deleteOne({
        _id: id
      });
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

});

export default router;