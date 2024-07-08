// createRequest.js

function createRequest(options) {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.responseType = 'json';
    
    xhr.onload = () => {
      options.callback(null, xhr.response);
    };
    
    xhr.onerror = () => {
      options.callback(xhr.response, null);
    };
    
    if (options.method === 'GET') {
      xhr.send();
    } else {
      const formData = new FormData();
      for (const key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.send(formData);
    }
  }
  