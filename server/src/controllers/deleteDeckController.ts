import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async function deleteDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deletedDeck = await Deck.findByIdAndDelete(deckId);
  res.json(deletedDeck);
}