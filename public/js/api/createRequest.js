// createRequest.js

function createRequestQuery(url, data) {
  const urlParams = new URLSearchParams(data).toString();
  return url + '?' + urlParams;
}

function createRequestForm(data) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

function sendRequest(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.onload = () => {
    callback(null, xhr.response);
  };

  xhr.onerror = () => {
    callback(xhr.response, null);
  };

  xhr.send(data);
}

function createRequest(options) {
  const { method, url, data, callback } = options;
  let requestQuery = url;
  let requestForm = null;

  if (method === 'GET') {
    requestQuery = createRequestQuery(url, data);
  } else {
    requestForm = createRequestForm(data);
  }

  sendRequest(method, requestQuery, requestForm, callback);
}
