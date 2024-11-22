import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchWeather,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from './weatherSlice';

function* fetchWeatherSaga(action) {
  try {
    const { city } = action.payload;
    const response = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78793e454552ba50e695b25ba2d02a4a`
    );
    yield put(fetchWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchWeatherFailure(error.message));
  }
}

export default function* weatherSaga() {
  yield takeLatest(fetchWeather.type, fetchWeatherSaga);
}
