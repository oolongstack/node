const http = require("node:http");
const EventEmitter = require("events");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application extends EventEmitter {
  constructor() {
    super();
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  compose(ctx) {
    const that = this;
    let index = -1; // 防止next多次调用
    function dispatch(i) {
      if (i <= index) return Promise.reject("next() call multiples times");
      index = i;
      //  没有注册中间件
      if (that.middlewares.length === i) return Promise.resolve();
      // 拿到要执行的中间件
      let middleware = that.middlewares[i];
      try {
        return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject("...");
      }
    }
    return dispatch(0);
  }
  createContext(req, res) {
    const ctx = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    ctx.request = request;
    ctx.request.req = ctx.req = req;

    ctx.response = response;
    ctx.response.res = ctx.res = res;

    return ctx;
  }
  // 保证this
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    res.statusCode = 404;
    // this.fn(ctx);
    this.compose(ctx)
      .then(() => {
        const body = ctx.body;
        if (body) {
          res.end(body);
        } else {
          res.end("Not Found");
        }
      })
      .catch((err) => {
        console.log("catch");
        this.emit("error", err);
      });
  }
  listen() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...arguments);
  }
}

module.exports = Application;
