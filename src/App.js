import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setCity, getCityWeather } from './redux/actions';
import './App.less';
import { smallSunIcon, woman, sun, sunShadow, lookingGlass } from './SvgIcons.jsx';

const SEARCH_DELAY = 1000;

function App({ city, handleGetCityWeather, widgetData, handleSetCity }) {
  const { loading, error, weatherData } = widgetData;
  const { main: { temp } = {}, weather = [] } = {} = weatherData || {};
  let weatherType = (weather[0] && weather[0].main) || '';

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      handleGetCityWeather(city);
      isFirstRun.current = false;
      return;
    }

    const searchTimeout = setTimeout(() => {
      handleGetCityWeather(city);
    }, SEARCH_DELAY);

    return () => clearTimeout(searchTimeout);
  }, [handleGetCityWeather, city]);

  function handleCityChange(e) {
    console.log(e.target.value);
    handleSetCity(e.target.value);
  }

  function handleCityFocus() {
    console.log('hide lupa');
  }

  let widgetClasses = 'sunny';
  if (weatherType && weatherType !== 'Clear' && weatherType !== 'Clouds') widgetClasses = 'rainy';
  const displayTemp = temp ? Math.round(temp * 10) / 10 : '';

  return (
    <div className="App">
      <div id="widget" className={widgetClasses}>
        <div id="main-weather-info">
          <form>
            <input type="text" value={city} onChange={handleCityChange} onFocus={handleCityFocus} />
            {lookingGlass}
          </form>
          {loading ? <div>Loading...</div> : (
            <>
              <div>
                <span className="temp">{displayTemp}°</span>
                <span className="temp-small-icon">{smallSunIcon}</span>
                <span className="temp-unit">C</span>
              </div>
              <div className="weather-type">{weatherType}</div>
              <div id="sunny-weather-svg">
                {sun}
                {sunShadow}
                {woman}
              </div>
            </>
          )}
        </div>

        <div id="rainy-weather-svg">
          {/* {sun}
          {sunShadow}
          {woman} */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { city, weatherData, loading, error } = state.weather;
  return { city, widgetData: { loading, error, weatherData } };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSetCity: city => {
      dispatch(setCity(city));
    },
    handleGetCityWeather: city => {
      dispatch(getCityWeather(city));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
