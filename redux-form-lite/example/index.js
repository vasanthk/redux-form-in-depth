import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import formReducer from '../reducer';
import {combineReducers, createStore} from 'redux';

const reducers = {
  forms: formReducer
};

const store = createStore(combineReducers(reducers));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
