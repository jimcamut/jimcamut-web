import axios from 'axios';
import ConfigureStore from '../redux';
const { store } = ConfigureStore();
const { REACT_APP_API_URL, REACT_APP_API_VERSION } = process.env;

export const base = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}`;

export const req = (options, setTokenHeaders) => {
  return new Promise((resolve, reject) => {
    options = options || {};
    options.method = options.method || 'get';

    if (setTokenHeaders) {
      const user = store.getState().user || {};
      options.headers = Object.assign({}, options.headers || {}, {
        'X-Session-Token': user.sessionToken
      });
    }
    axios(options)
      .then(resolve)
      .catch(reject);
  });
};
