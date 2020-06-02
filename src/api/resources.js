import { base, req } from './utils';

export const getResume = () => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/resources/resume` })
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data.result);
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};
