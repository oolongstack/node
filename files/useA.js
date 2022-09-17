const path = require("path");
const fs = require("fs");
const vm = require("vm");
//实现cjs
function Module(id) {
  this.id = id;
  this.exports = {}; // 默认的导出对象
}
Module.prototype.load = function () {
  console.log("加载");
  const extension = path.extname(this.id);
  Module._extensions[extension](this); // 加载不同文件 使用不同策略
};
Module._extensions = {
  ".js"(module) {
    const source = fs.readFileSync(module.id);
    const wrapper = [
      "(function (exports,module,require,__dirname,__filename){",
      "})",
    ];
    const script = wrapper[0] + source + wrapper[1];
    // console.log(script);
    const fn = vm.runInThisContext(script);

    // console.log(fn, typeof fn);
    const exports = module.exports;
    fn.call(
      module,
      exports,
      module,
      myrequire,
      path.dirname(module.id),
      module.id
    );
  },
  ".json"(module) {
    const content = fs.readFileSync(module.id);
    module.exports = JSON.parse(content);
  },
};
Module._cache = {};
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
  if (Module._cache[filePath]) return Module._cache[filePath].exports;

  const module = new Module(filePath);
  Module._cache[filePath] = module;

  module.load(); // 加载该模块
  return module.exports; // require返回的就是module.exports
}

// ----------------------------
const a = myrequire("./a.js");
const b = myrequire("./a.js");

console.log(a);
console.log(b);
// setTimeout(() => {
//   console.log(a.b);
// }, 2000);
