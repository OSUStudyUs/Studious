import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import './index.scss';
import reducers from './root_reducer';
import App from './App';

/* This is required for materialUI to actually work. Handles click/tap events that components depend on. */ 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(
  thunk,
  promise,
  process.env.NODE_ENV === 'production' ? null : logger
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
