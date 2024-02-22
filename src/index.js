import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import App from './containers/App';
import logger from 'redux-logger';
import searchFieldReducer from './features/SearchField/SearchFieldSlice'
import fetchRobotsReducer from './features/SearchField/SearchFieldSlice'
import 'tachyons';
import './containers/App.css'
import './index.css'
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  searchField: searchFieldReducer,
  fetchRobots: fetchRobotsReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <App/>
</Provider>);


