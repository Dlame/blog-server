/**
 * 所有接口路由
 */
const article = require("./modules/article");

module.exports = app =>{
  app.post('/addArticle', article.addArticle);
}