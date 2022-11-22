import { Request, Response } from 'express';
import Deck from '../models/Deck';

async function deleteCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const cardIndex = req.params.index;
  const deck = await Deck.findById(deckId);

  if (!deck) return res.status(400).send('No deck of this id exists');
  deck.cards.splice(parseInt(cardIndex), 1);
  await deck.save();
  res.json(deck);
}

export default deleteCardForDeckController;