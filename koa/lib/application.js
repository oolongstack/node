const http = require("node:http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    this.fn = fn;
  }
  createContext(req, res) {
    const ctx = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    ctx.request = request;
    ctx.request.req = ctx.req = req;

    ctx.response = response;
    ctx.request.res = ctx.res = res;

    return ctx;
  }
  // 保证this
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.fn(ctx);

    res.end(ctx.body);
  }
  listen() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...arguments);
  }
}

module.exports = Application;
