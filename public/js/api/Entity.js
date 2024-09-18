// Entity.js

class Entity {
  static list(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL,
      data,
      callback
    });
  }

  static create(data, callback) {
    createRequest({
      method: 'PUT',
      url: this.URL,
      data,
      callback
    });
  }

  static remove(data, callback) {
    createRequest({
      method: 'DELETE',
      url: this.URL,
      data,
      callback
    });
  }
}
