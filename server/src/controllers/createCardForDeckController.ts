import { Request, Response } from 'express';
import Deck from '../models/Deck';

async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  const card = req.body;

  if (!deck) return res.status(400).send('No deck of this id exists');
  deck.cards.push(card);
  await deck.save();
  res.json(deck.cards[deck.cards.length - 1]);
}

export default createCardForDeckController;