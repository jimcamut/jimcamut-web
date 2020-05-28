import { base, req } from './utils';

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    req({
      url: `${base}/users/login`,
      method: 'post',
      data: { email, password }
    })
      .then(res => {
        console.log('LOGIN RES1', res);
        const { status, data } = res || {};
        if (status === 200) return resolve(data.result);
        reject(res.data);
      })
      .catch(e => reject(e.response));
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    req(
      {
        url: `${base}/users/logout`,
        method: 'post'
      },
      true
    )
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve();
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const me = () => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/me` }, true)
      .then(res => {
        const { status, data, result } = res || {};
        if (status === 200) return resolve(result);
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const register = data => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/register`, method: 'post', data })
      .then(res => {
        const { status, data, result } = res || {};
        if (status === 200) return resolve(result);
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const resetPassword = data => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/reset-password`, method: 'post', data })
      .then(res => {
        const { status, data, result } = res || {};
        if (status === 200) return resolve(result);
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const recoverPassword = data => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/recover-password`, method: 'post', data })
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data || {});
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};
