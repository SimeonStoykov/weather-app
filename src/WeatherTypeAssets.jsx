import React from 'react';
import { smallSunIcon, smallRainIcon, woman, sun, sunShadow, cloud } from './SvgIcons.jsx';

export default {
  sunny: {
    smallIcon: smallSunIcon,
    bigImage: <div id="sunny-weather-svg">
      {sun}
      {sunShadow}
      {woman}
    </div>
  },
  rainy: {
    smallIcon: smallRainIcon,
    bigImage: <div id="rainy-weather-svg">
      {woman}
      {cloud}
    </div>
  }
};