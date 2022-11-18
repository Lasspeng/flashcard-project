
import express, { Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';

import Deck from './models/Deck';
import cors from 'cors';

// Hide credentials for Mongo database access
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT: number = 4000;

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find();
  console.log(decks);
  res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deletedDeck = await Deck.findByIdAndDelete(deckId);
  res.json(deletedDeck);
})

async function connectToDB() {
  try {
    const server = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`listening on port ${PORT}`);
    app.listen(4000);
  } catch (error) {
    console.log(error);
  }
};
connectToDB();