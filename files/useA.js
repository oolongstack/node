const path = require("path");
const fs = require("fs");
//实现cjs
function Module(id) {
  this.id = id;
  this.exports = {}; // 默认的导出对象
}
Module.prototype.load = function () {
  // console.log(this);
  const extension = path.extname(this.id);
  Module._extensions[extension](this); // 加载不同文件 使用不同策略
};
Module._extensions = {
  ".js"(module) {},
  ".json"(module) {
    const content = fs.readFileSync(module.id);
    module.exports = JSON.parse(content);
  },
};
Module._resolveFilename = function (id) {
  const filePath = path.resolve(__dirname, id);
  const isExist = fs.existsSync(filePath); // 文件路径是否存在
  if (isExist) return filePath;
  // 尝试添加后缀再查看是否存在(js,json)
  const exts = Object.keys(Module._extensions);
  for (let i = 0; i < exts.length; i++) {
    let p = filePath + exts[i];
    if (fs.existsSync(p)) return p;
  }
  throw new Error("模块不存在");
};
function myrequire(id) {
  const filePath = Module._resolveFilename(id); // 根据相对路径获取绝对路径
  const module = new Module(filePath);
  module.load(); // 加载该模块
  return module.exports; // require返回的就是module.exports
}

// ----------------------------
const a = myrequire("./a.json");
console.log(a.name);
// setTimeout(() => {
//   console.log(a.b);
// }, 2000);
