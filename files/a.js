var a = 10;
var b = {
  name: "b",
};

setTimeout(() => {
  b.name = "c";
}, 1000);
module.exports = {
  a,
  b,
};
