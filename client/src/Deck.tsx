import React, { useState, useEffect } from 'react';
import './App.css';

import { Deck as TDeck } from './api/getDecks';
import getCards, { Card } from './api/getCards';
import createCard from './api/createCard';
import deleteCard from './api/deleteCard';

import { useParams } from 'react-router-dom';

// Defines cards before they are sent to the database and receive their ID
type clientSideCard = Omit<Card, '_id'>;

function Deck() {
  const [deckTitle, setDeckTitle] = useState<string>('');
  const [card, setCard] = useState <clientSideCard>({ header: '', body: '' });
  const [cards, setCards] = useState<Card[]>([]);

  // Gives the deckId for the currently selected deck
  let { deckId } = useParams();

  // Send new deck to database upon form submission
  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    if (card.header && card.body === '') return;
    const newCard = await createCard(deckId!, card.header, card.body);
    setCard({ header: '', body: '' });

    // Rerender to include the newly added deck
    setCards([...cards, newCard]);
  };

  // Request array of cards from database
  useEffect(() => {
    async function fetchCards() {
      const deck = await getCards(deckId!);
      setCards(deck.cards);
      setDeckTitle(deck.title);
    }
    fetchCards();
  }, [])

  async function handleDeleteCard(deckId: string, cardIndex: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, cardIndex);
    // Rerender to exclude the newly deleted card
    setCards(newDeck.cards);
  }

  return (
    <div className='deck'>
      <form onSubmit={handleCreateCard}>
        <label htmlFor='card-header'>Card Header:</label>
        <input id='card-header'
        value={card.header}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCard({ ...card, header: e.target.value });
        }} />
        <label htmlFor='card-body'>Card Body:</label>
        <input id='card-body'
        value={card.body}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCard({ ...card, body: e.target.value });
        }}
        />
        <button>Create Card</button>
      </form>
      <h1>{deckTitle}</h1>
      <div className='cards'>
        {cards.map((card, index) => (
          <div key={card._id}>
            <button onClick={() => handleDeleteCard(deckId!, index)}>X</button>
            <h3>{card.header}</h3>
            {card.body}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deck;