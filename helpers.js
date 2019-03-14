import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'UdaciFitness:notifications', APP_DECKS = 'DECKS';

const _getDecksAsync = async () => {
  try {
    const fetchedData = await AsyncStorage.getItem(APP_DECKS);
    if (fetchedData !== null) {
      return JSON.parse(fetchedData);
    }
  } catch(error) {
    console.log(error);
  }
};

const _saveDeckTitleAsync = async deckTitle => {
  try {
    const deckUID = generateUID();
    return await AsyncStorage
      .mergeItem(APP_DECKS, JSON.stringify({ [deckUID]: { title: deckTitle } }))
      .then(res => deckUID);
  } catch(error) {
    console.log(error);
  }
};

const _addCardToDeckAsync = async (deckId, cardInfo) => {
  try {
    const cardUID = generateUID();
    return await AsyncStorage
      .mergeItem(APP_DECKS, JSON.stringify({
        [deckId]: {
          questions: {
            [cardUID]: cardInfo
          }
        }
      }))
      .then(res => cardUID);
  } catch(error) {
    console.log(error);
  }
};

const _removeDeckAsync = async deckId => {
  try {
    const {[deckId]: omit, ...store} = await _getDecksAsync();
    return await AsyncStorage.setItem(APP_DECKS, JSON.stringify(store));
  } catch(error) {
    console.log(error);
  }
};

const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
};

const createNotification = () => {
  return {
    title: 'Did you review today?',
    body: "👋 Hey! Let's go for your daily review!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
};

const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
  };

export { _getDecksAsync, _saveDeckTitleAsync, _addCardToDeckAsync, _removeDeckAsync, clearLocalNotification, createNotification, setLocalNotification };
