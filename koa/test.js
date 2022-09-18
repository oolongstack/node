async function mid1(next) {
  console.log(1);
  await next();
  console.log(4);
}

async function mid2(next) {
  console.log(2);
  await next();
  console.log(5);
}

async function mid3(next) {
  console.log(3);
  await next();
  console.log(6);
}

const middleware = [mid1, mid2, mid3];
function compose(middlewares) {
  return function () {
    function dispatch(i) {
      if (i == middlewares.length) return "没有中间件";
      let middleware = middlewares[i];
      middleware(() => dispatch(i + 1));
    }
    dispatch(0);
  };
}
compose(middleware)();
