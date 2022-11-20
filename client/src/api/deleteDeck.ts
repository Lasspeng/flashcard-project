async function deleteDeck(deckId: string) {
  await fetch(`http://localhost:4000/decks/${deckId}`, {
    method: 'DELETE',
  });
}

export default deleteDeck;