import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import decks from './reducers/';
import ReduxPromise from 'redux-promise';
import Home from './components/Home/';
import { setLocalNotification } from './helpers';

const store = createStore(decks, applyMiddleware(ReduxPromise));

export default class App extends React.Component {
  componentWillMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store} >
        <Home />
      </Provider>
    );
  }
}
