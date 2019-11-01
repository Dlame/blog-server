const { mongoose } = require("../core/mongodb.js");
const autoIncrement = require("mongoose-auto-increment");

// 标签实体
const tagSchema = new mongoose.Schema({
  // 标签模型
  name: { type: String, required: true, validate: /\S+/ },
  // 标签描述
  desc: String,
  // 图标
  icon: String,
  // 发布日期
  create_time: { type: Date, default: new Date() },
  // 最后修改日期
  update_time: { type: Date, default: new Date() }
});

tagSchema.plugin(autoIncrement.plugin, {
  model: "Tag",
  field: "id",
  startAt: "1",
  incrementBy: 1
});

module.exports = mongoose.model("Tag", tagSchema);
