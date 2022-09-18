const context = {};

function defineGetter(target, key) {
  context.__defineGetter__(key, function () {
    return this[target][key];
  });
}
function defineSetter(target, key) {
  context.__defineSetter__(key, function (newVal) {
    this[target][key] = newVal;
    return true;
  });
}

defineGetter("request", "url");
defineGetter("request", "path");
defineGetter("request", "query");

defineGetter("response", "body");
defineSetter("response", "body");
module.exports = context;
