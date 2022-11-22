import { Deck } from './getDecks';

async function deleteCard(
  deckId: string,
  cardIndex: number
  ): Promise<Deck> {
  const response = await fetch(`http://localhost:4000/decks/${deckId}/cards/${cardIndex}`, {
    method: 'DELETE',
  });
  return response.json();
}

export default deleteCard;