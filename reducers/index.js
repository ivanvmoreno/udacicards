const decks = (store = {}, action) => {
  switch(action.type) {
    case 'GET_DECKS':
      return action.payload;
    case 'SAVE_DECK_TITLE':
      return {
        ...store,
        ...action.payload
      };
    case 'ADD_CARD_TO_DECK':
      return {
        ...store,
        [action.payload.deckId]: {
          ...store[action.payload.deckId],
          questions: {
            ...store[action.payload.deckId].questions,
            ...action.payload.cardInfo
          }
        }
      };
    case 'REMOVE_DECK':
      const {[action.payload]: omit, ...newStore} = store;
      return newStore;
    default:
      return store;
  }
};

export default decks;
