// const Koa = require("./lib");
const Koa = require("./lib");
const app = new Koa();
// app.use((ctx) => {
// console.log(ctx.req.url);
// console.log(ctx.request.req.url);
// console.log(ctx.request.url);
// console.log(ctx.request.path);
// console.log(ctx.request.query);
// console.log(ctx.path);
// console.log(ctx.url);
// console.log(ctx.query);
// ctx.body = "cjl";
// ctx.response.body = "lll";
// });
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("sleeped");
      resolve("sleep");
    }, 2000);
  });
};

app.use(async (ctx, next) => {
  console.log(1);
  ctx.body = "1";
  await next();
  console.log(2);
  ctx.body = "2";
});
app.use(async (ctx, next) => {
  console.log(3);
  ctx.body = "3";
  // await sleep();
  next();
  next();
  console.log(4);
  ctx.body = "4";
});
app.use(async (ctx, next) => {
  console.log(5);
  ctx.body = "5";
  await next();
  console.log(6);
  ctx.body = "6";
});
app.on("error", (message) => {
  console.log(message);
});
app.listen(3000, () => {
  console.log("server start 3000");
});
