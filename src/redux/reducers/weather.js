import {
  GET_CITY_WEATHER_STARTED,
  GET_CITY_WEATHER_SUCCESS,
  GET_CITY_WEATHER_FAILURE
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  weatherData: { temp: '', weatherType: '' }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITY_WEATHER_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        weatherData: { ...action.payload }
      };
    case GET_CITY_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
