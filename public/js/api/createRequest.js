// createRequest.js

function prepareRequestData(method, url, data) {
    if (method === 'GET') {
      const urlParams = new URLSearchParams(data).toString();
      return url + '?' + urlParams;
    } else {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      return formData;
    }
  }
  
  function sendRequest(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
  
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, xhr.response);
      } else {
        callback(xhr.response, null);
      }
    };
  
    xhr.onerror = () => {
      callback(xhr.response, null);
    };
  
    if (method === 'GET') {
      xhr.send();
    } else {
      xhr.send(data);
    }
  }
  
  function createRequest(options) {
    const { method, url, data, callback } = options;
    let requestData;
  
    if (method === 'GET') {
      requestData = prepareRequestData(method, url, data);
      sendRequest(method, requestData, null, callback);
    } else {
      requestData = prepareRequestData(method, url, data);
      sendRequest(method, url, requestData, callback);
    }
  }
  
  