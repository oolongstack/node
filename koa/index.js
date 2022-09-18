const Koa = require("./lib");
const app = new Koa();
app.use((ctx) => {
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log(ctx.request.url);
  console.log(ctx.request.path);
  console.log(ctx.request.query);
  console.log(ctx.path);
  console.log(ctx.url);
  console.log(ctx.query);

  ctx.body = "cjl";
  ctx.response.body = "lll";
});

app.listen(3000, () => {
  console.log("server start 3000");
});
