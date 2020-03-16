import axios from 'axios';

const { REACT_APP_API_URL, REACT_APP_API_VERSION } = process.env;
const apiBase = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}`;

// https://uber.github.io/react-vis/website/dist/storybook/index.html?knob-X%20Axis=true&knob-BarSeries.1.cluster=stack%201&knob-BarSeries.2.cluster=stack%201&knob-BarSeries.3.cluster=stack%201&knob-vertical%20gridlines=true&knob-stroke=%2312939a&knob-horizontal%20gridlines=true&knob-opacity=1&knob-orientation=vertical&knob-fill=%2312939a&knob-style=%7B%22stroke%22%3A%22%232c51be%22%2C%22strokeWidth%22%3A%223px%22%7D&knob-colorScale=category&knob-Y%20Axis=true&selectedKind=Series%2FVerticalBarSeries%2FStyling%2FBy%20datapoint&selectedStory=opacity&full=0&addons=1&stories=1&panelRight=0&addonPanel=kadira%2Fjsx%2Fpanel

const _req = options => {
  return new Promise((resolve, reject) => {
    options = options || {};
    options.method = options.method || 'get';
    axios(options)
      .then(resolve)
      .catch(reject);
  });
};

export const ping = () => {
  return new Promise((resolve, reject) => {
    _req({ url: `${apiBase}` }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};

export const fetchFeed = params => {
  return new Promise((resolve, reject) => {
    const { limit, after } = params || {};
    _req({
      url: `${apiBase}/strava`,
      params: { limit, after }
    }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};

export const fetchGrams = params => {
  return new Promise((resolve, reject) => {
    const { limit, after } = params || {};
    _req({
      url: `${apiBase}/grams`,
      params: { limit, after }
    }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};

export const fetchTweets = params => {
  return new Promise((resolve, reject) => {
    const { limit, after } = params || {};
    _req({
      url: `${apiBase}/tweets`,
      params: { limit, after }
    }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};

export const fetchDash = () => {
  return new Promise((resolve, reject) => {
    _req({ url: `${apiBase}/dash` }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};
