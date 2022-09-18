const response = {
  _body: undefined,
  get body() {
    return this._body;
  },
  set body(content) {
    this._body = content;
  },
};

module.exports = response;
