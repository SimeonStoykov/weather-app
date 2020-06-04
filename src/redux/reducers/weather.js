import {
  SET_CITY,
  GET_CITY_WEATHER_STARTED,
  GET_CITY_WEATHER_SUCCESS,
  GET_CITY_WEATHER_FAILURE
} from '../actionTypes';

const initialState = {
  city: 'Plovdiv',
  loading: false,
  error: null,
  weatherData: { temp: '', weatherType: '' }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city: action.payload.city
      };
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
