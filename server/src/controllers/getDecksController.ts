import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async function getDecksController(req: Request, res: Response) {
  const decks = await Deck.find();
  res.json(decks);
}