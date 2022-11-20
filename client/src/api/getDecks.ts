export interface Deck {
  title: string,
  _id: string;
};
async function getDecks(): Promise<Deck[]>{
  const response = await fetch('http://localhost:4000/decks');
  return await response.json();
}

export default getDecks;