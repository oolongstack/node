const url = require("url");
const request = {
  get url() {
    return this.req.url;
  },
  get path() {
    const { pathname } = url.parse(this.req.url);
    // /sum?a=1  pathname: /sum
    return pathname;
  },
  get query() {
    const { query } = url.parse(this.req.url, true);
    return query;
  },
};

module.exports = request;
