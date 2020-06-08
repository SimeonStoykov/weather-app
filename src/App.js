import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setCity, getCityWeather } from './redux/actions';
import './App.less';
import { lookingGlass } from './SvgIcons.jsx';
import weatherTypeAssets from './WeatherTypeAssets.jsx';

const SEARCH_DELAY = 1000;

function App({ city, handleGetCityWeather, widgetData, handleSetCity }) {
  const { loading, error, weatherData } = widgetData;
  const { main: { temp } = {}, weather = [] } = {} = weatherData || {};
  let weatherType = (weather[0] && weather[0].main) || '';

  const cityInputRef = useRef();
  const isFirstRun = useRef(true);

  const [isLookupIconVisible, setIsLookupIconVisible] = useState(true);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  useEffect(() => {
    if (isFirstRun.current) {
      handleGetCityWeather(city);
      isFirstRun.current = false;
      return;
    }

    setIsSpinnerVisible(true);

    const searchTimeout = setTimeout(() => {
      handleGetCityWeather(city);
      setIsSpinnerVisible(false);
      cityInputRef.current.blur();

    }, SEARCH_DELAY);

    return () => clearTimeout(searchTimeout);
  }, [handleGetCityWeather, city]);

  function handleCityChange(e) {
    handleSetCity(e.target.value);
  }

  function handleCityFocus() {
    setIsLookupIconVisible(false);
  }

  function handleCityBlur() {
    setIsLookupIconVisible(true);
  }

  let currCityWeatherType = 'default';

  if (weatherType) {
    if (weatherType === 'Clear' || weatherType === 'Clouds') currCityWeatherType = 'sunny';
    else currCityWeatherType = 'rainy';
  }

  function getWidgetData() {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (currCityWeatherType === 'default') return <div> No data for this location. Type another and try again.</div>;
    const displayTemp = temp ? Math.round(temp * 10) / 10 : '';
    return (
      <div id="temp-info">
        <div className="temp-parts">
          <span className="temp">{displayTemp}°</span>
          <span className="temp-unit">C</span>
          <span className="temp-small-icon">{weatherTypeAssets[currCityWeatherType].smallIcon}</span>
        </div>
        <p className="weather-type">{weatherType}</p>
        <a href="#" className="more-details-link">More details ></a>
        {weatherTypeAssets[currCityWeatherType].bigImage}
      </div>
    );
  }

  return (
    <div className="App">
      <div id="widget" className={currCityWeatherType}>
        <div id="main-weather-info">
          <form>
            <input
              type="text"
              ref={cityInputRef}
              value={city}
              placeholder='type location...'
              onChange={handleCityChange}
              onFocus={handleCityFocus}
              onBlur={handleCityBlur}
            />
            {isLookupIconVisible && lookingGlass}
            {isSpinnerVisible && <div className="spinner">Loading...</div>}
          </form>
          {getWidgetData()}
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
