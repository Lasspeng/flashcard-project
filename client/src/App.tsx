import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import getDecks, { Deck } from './api/getDecks';
import createDeck from './api/createDeck';
import deleteDeck from './api/deleteDeck';



function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);

  // Send new deck to database upon form submission
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (title === '') return;
    const newDeck = await createDeck(title);
    setTitle('');

    // Rerender to include the newly added deck
    setDecks([...decks, newDeck])
  };

  // Request array of decks from database
  useEffect(() => {
    async function fetchDecks() {
      const decks = await getDecks();
      setDecks(decks);
    }
    fetchDecks();
  }, [])

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    // Rerender to exclude the newly deleted deck
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className='app'>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title:</label>
        <input id='deck-title'
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }} />
        <button>Create Deck</button>
      </form>
      <div className='decks'>
        {decks.map((deck) => (
          <div key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            {<Link className='deck-link' to={`decks/${deck._id}`}>{deck.title}</Link>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
