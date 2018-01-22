import { ADD_DECK, RECEIVE_DECKS, ADD_CARD } from '../actions/deck.action';

const initialState = {
  decks: {},
  isDoneDeck: false,
  errorDeck: null
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DECKS.FULFILLED:
      return {
        ...state,
        decks: action.payload,
        isDoneDeck: true,
        errorDeck: null
      };
    case RECEIVE_DECKS.PENDING:
      return {
        ...state,
        isDoneDeck: false,
        errorDeck: null
      };
    case RECEIVE_DECKS.REJECTED:
      return {
        ...state,
        errorDeck: action.payload,
        isDoneDeck: true
      };
    case ADD_DECK.FULFILLED:
      return {
        ...state,
        decks: { ...state.decks, ...action.payload },
        isDoneDeck: true,
        errorDeck: null
      };

    case ADD_DECK.PENDING:
      return {
        ...state,
        isDoneDeck: false,
        errorDeck: null
      };
    case ADD_DECK.REJECTED:
      return {
        ...state,
        errorDeck: action.payload,
        isDoneDeck: true
      };

    case ADD_CARD.FULFILLED:
      const key = Object.keys(action.payload)[0];
      return {
        ...state,
        decks: {
          ...state.decks,
          [key]: {
            ...state.decks[key],
            questions: [...state.decks[key].questions, action.payload[key]]
          }
        }
      };

    case ADD_CARD.PENDING:
      return {
        ...state,
        isDoneDeck: false,
        errorDeck: null
      };
    case ADD_CARD.REJECTED:
      return {
        ...state,
        errorDeck: action.payload,
        isDoneDeck: true
      };

    default:
      return state;
  }
};

export default deckReducer;
