import 'whatwg-fetch';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const request = (url, { method, body }) =>
  fetch(`${baseUrl}/api${url}`, {
    headers: { // eslint-disable-line quote-props
      Accept: 'application/json, text/html',
      'Access-Control-Allow-Origin': '*',
      Authorization: localStorage.userToken && `Bearer ${localStorage.userToken}`,
      'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      }

      return response.json()
    })

const del = (url) => request(url, { method: 'delete' });
const get = (url) => request(url, { method: 'get' });
const post = (url, body) => request(url, { method: 'post', body });
const put = (url, body) => request(url, { method: 'put', body });

export default { del, get, post, put };
