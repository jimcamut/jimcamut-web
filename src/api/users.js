import { base, req } from './utils';

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    req({
      url: `${base}/users/login`,
      method: 'post',
      data: { email, password }
    })
      .then(res => {
        const { status, data } = res || {};
        const { result } = data || {};
        if (status === 200) return resolve(result);
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
        const { status, data } = res || {};
        const { result } = data || {};
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
        const { status, data } = res || {};
        const { result } = data || {};
        if (status === 200) return resolve(result);
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const verifyEmail = () => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/verify-email`, method: 'post' }, true)
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data || {});
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const updatePassword = data => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/update-password`, method: 'post', data }, true)
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data || {});
        reject(data);
      })
      .catch(e => reject(e.response));
  });
};

export const setNewPassword = data => {
  return new Promise((resolve, reject) => {
    req({ url: `${base}/users/set-new-password`, method: 'post', data })
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) return resolve(data || {});
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
