import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import './index.css';
import reducers from './root_reducer';
import App from './App';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, promise, logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
