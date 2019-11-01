const consola = require("consola");
const CONFIG = require("../app.config");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

// remove DeprecationWarning
mongoose.set("useFindAndModify", false);

// mongoose Promise
mongoose.Promise = global.Promise;

// mongoose
exports.mongoose = mongoose;

exports.connect = () => {
  // 连接数据库
  mongoose.connect(CONFIG.MONGODB.uri, {
    useCreateIndex: true, // 创建索引
    useNewUrlParser: true, // 使用新url解释器
    promiseLibrary: global.Promise
  });

  // 连接错误
  mongoose.connection.once("error", error => {
    consola.warn("数据库连接失败!", error);
  });

  // 连接成功
  mongoose.connection.once("open", () => {
    consola.ready("数据库连接成功!");
  });

  // 自增 ID 初始化
  autoIncrement.initialize(mongoose.connection);

  // 返回实例
  return mongoose;
};
