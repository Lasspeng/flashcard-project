async function createDeck(title: string) {
  const response = await fetch('http://localhost:4000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    return await response.json();
}

export default createDeck;