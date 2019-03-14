import { _getDecksAsync, _saveDeckTitleAsync, _addCardToDeckAsync, _removeDeckAsync } from '../helpers';

const getDecks = () => {
  return {
    type: 'GET_DECKS',
    payload: _getDecksAsync()
  };
};

const saveDeckTitle = (dispatch, deckTitle) => {
  return _saveDeckTitleAsync(deckTitle)
    .then(res => {
      dispatch({
        type: 'SAVE_DECK_TITLE',
        payload: {
          [res]: {
            title: deckTitle
          }
        }
      });
      return res;
    });
};

const addCardToDeck = (dispatch, deckId, cardInfo) => {
  return _addCardToDeckAsync(deckId, cardInfo)
    .then(res => {
      dispatch({
        type: 'ADD_CARD_TO_DECK',
        payload: {
          deckId: deckId,
          cardInfo: {
            [res]: cardInfo
          }
        }
      });
    });
};

const removeDeck = (dispatch, deckId) => {
  return _removeDeckAsync(deckId)
    .then(res => {
      dispatch({
        type: 'REMOVE_DECK',
        payload: deckId
      });
    });
};

export { getDecks, saveDeckTitle, addCardToDeck, removeDeck };
