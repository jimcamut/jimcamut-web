import axios from "axios";

// https://uber.github.io/react-vis/website/dist/storybook/index.html?knob-X%20Axis=true&knob-BarSeries.1.cluster=stack%201&knob-BarSeries.2.cluster=stack%201&knob-BarSeries.3.cluster=stack%201&knob-vertical%20gridlines=true&knob-stroke=%2312939a&knob-horizontal%20gridlines=true&knob-opacity=1&knob-orientation=vertical&knob-fill=%2312939a&knob-style=%7B%22stroke%22%3A%22%232c51be%22%2C%22strokeWidth%22%3A%223px%22%7D&knob-colorScale=category&knob-Y%20Axis=true&selectedKind=Series%2FVerticalBarSeries%2FStyling%2FBy%20datapoint&selectedStory=opacity&full=0&addons=1&stories=1&panelRight=0&addonPanel=kadira%2Fjsx%2Fpanel

const req = options => {
  return new Promise((resolve, reject) => {
    const { method = "get", url } = options || {};
    axios({ url, method })
      .then(resolve)
      .catch(reject);
  });
};

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    req({ url: `${process.env.REACT_APP_API_URL}/strava` }).then(res => {
      const { status, data } = res || {};
      if (status === 200) return resolve(data.result);
      reject(res.data);
    });
  });
};
