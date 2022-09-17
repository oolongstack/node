const a = require("./a.js");
console.log(a);

setTimeout(() => {
  console.log(a.b);
}, 2000);
