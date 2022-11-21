
import express, { Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';

import Deck from './models/Deck';
import cors from 'cors';

import getDecksController from './controllers/getDecksController';
import createDeckController from './controllers/createDeckController';
import deleteDeckController from './controllers/deleteDeckController';
import createCardForDeckController  from './controllers/createCardForDeckController';

// Hide credentials for Mongo database access
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT: number = 4000;

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);

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