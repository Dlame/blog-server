import Article from "../../models/article";
import User from "../../models/user";

import { responseClient } from "../../utils/utils";

/**
 * 新增文章
 */
exports.addArticle = (req, res) => {
  const {
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin
  } = req.body;
  let tempArticle = null;
  if (img_url) {
    tempArticle = new Article({
      title,
      author,
      keyword: keyword ? keyword.split(",") : [],
      content,
      numbers: content.length,
      desc,
      img_url,
      tags: tags ? tags.split(",") : [],
      category: category ? category.split(",") : [],
      state,
      type,
      origin
    });
  } else {
    tempArticle = new Article({
      title,
      author,
      keyword: keyword ? keyword.split(",") : [],
      content,
      numbers: content.length,
      desc,
      tags: tags ? tags.split(",") : [],
      category: category ? category.split(",") : [],
      state,
      type,
      origin
    });
  }

  tempArticle
    .save()
    .then(data => {
      responseClient(res, 200, 0, "保存成功", data);
    })
    .catch(err => {
      console.log(err);
      responseClient(res);
    });
};

/**
 * 更新文章
 */
exports.updateArticle = (req, res) => {
  const {
    id,
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin
  } = req.body;
  Article.update(
    { _id: id },
    {
      title,
      author,
      keyword: keyword ? keyword.split(",") : [],
      content,
      desc,
      img_url,
      tags: tags ? tags.split(",") : [],
      category: category ? category.split(",") : [],
      state,
      type,
      origin
    }
  )
    .then(result => {
      responseClient(res, 200, 0, "更新成功", result);
    })
    .catch(err => {
      console.error(err);
      responseClient(res);
    });
};

/**
 * 删除文章
 */
exports.delArticel = (req, res) => {
  const { id } = req.body;
  Article.deleteMany({ _id: id })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, "删除成功!");
      } else {
        responseClient(res, 200, 1, "文章不存在");
      }
    })
    .catch(err => {
      console.error("err :", err);
      responseClient(res);
    });
};

/**
 * 文章列表
 */
// exports.getArticleList = async (req, res) => {
//   let keyword = req.query.keyword || null;
//   let state = req.query.state || "";
//   let likes = req.query.likes || "";
//   let tag_id = req.query.tag_id || "";
//   let category_id = req.query.category_id || "";
//   let article = req.query.article || "";
//   let pageNum = parseInt(req.query.pageNum) || 1; //  页数
//   let pageSize = parseInt(req.query.pageSize) || 10; //
//   let responseData = {};
//   // 如果是文章归档 返回全部文章
//   if (article) {
//     pageSize = 1000;
//   }

//   let conditions = {}; // 查询条件

//   if (state === 0) {
//     if (keyword) {
//       const reg = new RegExp(keyword, "i"); //不区分大小写
//       conditions = {
//         $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }]
//       };
//     }
//   }
//   if (state === 1) {
//     state = parseInt(state);
//     if (keyword) {
//       const reg = new RegExp(keyword, "i");
//       conditions = {
//         $and: [
//           { $or: [{ state: state }] },
//           {
//             $or: [
//               { title: { $regex: reg } },
//               { desc: { $regex: reg } },
//               { keyword: { $regex: reg } }
//             ]
//           }
//         ]
//       };
//     }
//   }

//   let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
//   let responseData = {
//     count: 0,
//     list: [],
//   };
// };
