import { camelCase } from 'change-case';
import 'whatwg-fetch';

import jwt from './jwt';

const getToken = jwt.getToken;
const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const request = (url, { method, body }) =>
  new Promise((resolve, reject) => {
    fetch(`${baseUrl}/api${url}`, {
      headers: { // eslint-disable-line quote-props
        Accept: 'application/json, text/html',
        Authorization: getToken() && `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      method,
      mode: 'cors',
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject({ errors: response.text(), status: response.status });
        }

        return response.json();
      })
      .then((json) => resolve(json))
      .catch(({ errors, status }) => {
        // errors from the rails api are coming to us in snakecase
        // so we're converting to camelCase here before they get outside the actual fetching
        errors.then((text) => {
          try {
            const errorJSON = JSON.parse(text);
            const newErrors = Object.keys(errorJSON.errors).reduce((prev, key) => {
              prev[camelCase(key)] = errorJSON.errors[key];
              return prev;
            }, {});

            reject({ errors: newErrors, resource: errorJSON.resource, status });
          } catch (e) {
            reject({ status });
          }
        });
      });
  });

const del = (url) => request(url, { method: 'delete' });
const get = (url) => request(url, { method: 'get' });
const post = (url, body) => request(url, { method: 'post', body });
const put = (url, body) => request(url, { method: 'put', body });

export default { del, get, post, put };
