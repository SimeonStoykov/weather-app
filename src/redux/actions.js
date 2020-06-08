import {
  SET_CITY,
  GET_CITY_WEATHER_STARTED,
  GET_CITY_WEATHER_SUCCESS,
  GET_CITY_WEATHER_FAILURE
} from './actionTypes';

export const setCity = city => ({
  type: SET_CITY,
  payload: {
    city
  }
});

export const getCityWeather = city => {
  return dispatch => {
    dispatch(getCityWeatherStarted());

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3df237fbeefe24f961c22d583f87355e`)
      .then(response => response.json())
      .then(res => {
        dispatch(getCityWeatherSuccess(res));
      })
      .catch(err => {
        dispatch(getCityWeatherFailure(err.message));
      });
  };
};

const getCityWeatherStarted = () => ({
  type: GET_CITY_WEATHER_STARTED
});

const getCityWeatherSuccess = weatherData => ({
  type: GET_CITY_WEATHER_SUCCESS,
  payload: {
    ...weatherData
  }
});

const getCityWeatherFailure = error => ({
  type: GET_CITY_WEATHER_FAILURE,
  payload: {
    error
  }
});
