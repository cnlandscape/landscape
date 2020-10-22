import axios from 'axios';

axios.defaults.timeout = 50000;

//http request interceptors
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Accept": "application/vnd.github.inertia-preview+json"
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response interceptors
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return response;
    } else {
      return Promise.reject(response.status);
    }
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * GET request
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function fetch(url ){
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


