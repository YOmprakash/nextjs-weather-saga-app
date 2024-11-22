import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherReducer from './weatherSlice';
import weatherSaga from './saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Add saga middleware
});

// Run the saga
sagaMiddleware.run(weatherSaga);

export default store;
