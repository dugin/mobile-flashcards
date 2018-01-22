import { AsyncStorage } from 'react-native';

const DECKS = 'DECKS';

export async function clearDeck() {
  return AsyncStorage.removeItem(DECKS);
}

export async function loadDeck() {
  const decks = await AsyncStorage.getItem(DECKS);

  return JSON.parse(decks);
}

export async function saveDeck(deck) {
  await AsyncStorage.mergeItem(DECKS, JSON.stringify(deck));

  const decks = await loadDeck();

  const key = Object.keys(deck)[0];

  return { [key]: decks[key] };
}

export async function saveCard(card, deckTitle) {
  const decks = await loadDeck();

  decks[deckTitle].questions.push(card);

  await AsyncStorage.setItem(DECKS, JSON.stringify(decks));

  const newDecks = await loadDeck();

  return { [deckTitle]: newDecks[deckTitle].questions.pop() };
}
