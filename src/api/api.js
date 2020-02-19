import axios from "axios";

// TODO: use env for base configs

const req = options => {
  return new Promise((resolve, reject) => {
    const { method = "get", url } = options || {};
    axios({
      url,
      method
    })
      .then(resolve)
      .catch(reject);
  });
};

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    req({ url: "https://jimcamut-server.herokuapp.com/" }).then(res => {
      const { code, status, message, data, error, errors } = res.data || {};
      if (code === 200) return resolve(data);
      reject(res.data);
    });
  });
};
