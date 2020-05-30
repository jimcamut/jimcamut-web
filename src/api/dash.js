import { base, req } from './utils';

export const fetchDash = () => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/dash` })
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data.result);
        reject(res.data);
      })
      .catch(e => reject(e.response));
  });
};
