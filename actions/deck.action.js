import { loadDeck, saveCard, saveDeck } from '../api/decks.api';
import { createActionSet } from '../utils/action.helper';

export const ADD_DECK = createActionSet('ADD_DECK');
export const RECEIVE_DECKS = createActionSet('RECEIVE_DECKS');
export const ADD_CARD = createActionSet('ADD_CARD');

export const addDeck = deck => ({
  type: ADD_DECK.BASE,
  payload: saveDeck(deck)
});

export const receiveDecks = () => ({
  type: RECEIVE_DECKS.BASE,
  payload: loadDeck()
});

export const addCard = (card, deckTitle) => {
  return {
    type: ADD_CARD.BASE,
    payload: saveCard(card, deckTitle)
  };
};
