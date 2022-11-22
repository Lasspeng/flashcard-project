import { Deck } from './getDecks';

export interface Card {
  header: string,
  body: string,
  _id: string,
};

async function getCards(deckId: string): Promise<Deck> {
  const response = await fetch(`http://localhost:4000/decks/${deckId}/cards`);
  return await response.json();
}

export default getCards;