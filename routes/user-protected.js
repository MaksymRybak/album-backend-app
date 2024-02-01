import express from "express";

const router = express.Router();

// logout utente (NOTA: e' una rotta protetta, posso rimuovere il Cookie solo ad un utente loggato)
router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.send();
});

export default router;