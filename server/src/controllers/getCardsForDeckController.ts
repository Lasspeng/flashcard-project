import { Request, Response } from 'express';
import Deck from '../models/Deck';

async function getCardsForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);

  if (!deck) return res.status(400).send('No deck of this id exists');
  res.json(deck);
}

export default getCardsForDeckController;