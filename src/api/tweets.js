import { base, req } from './utils';

export const fetchTweets = params => {
  return new Promise((resolve, reject) => {
    const { limit, after } = params || {};
    req({
      url: `${base}/tweets`,
      params: { limit, after }
    })
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data.result);
        reject(res.data);
      })
      .catch(e => reject(e.response));
  });
};
