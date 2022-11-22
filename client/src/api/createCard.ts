async function createCard(deckId: string, headerContent: string, bodyContent: string) {
  const response = await fetch(`http://localhost:4000/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      header: headerContent,
      body: bodyContent,
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });
  return await response.json();
} 

export default createCard;