import express, { Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';

import Deck from './models/Deck';

const app = express();
app.use(express.json());

const CONNECTION_URL: string = 'mongodb+srv://flashcard:ILoveyou2@cluster0.4evugnz.mongodb.net/?retryWrites=true&w=majority';
const PORT: number = 4000;

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

async function connectToDB() {
  try {
    const server = await mongoose.connect(CONNECTION_URL);
    console.log(`listening on port ${PORT}`);
    app.listen(4000);
  } catch (error) {
    console.log(error);
  }
};
connectToDB();

