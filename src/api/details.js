// 封装文章详情相关的api
import request from "@/utils/request.js";

// 获取对应文章的详情
function getdetails(art_id) {
  return request({
    url: `v1_0/articles/${art_id}`,
    method: "get"
  });
}

// 获取评论或回复评论
function getFirstComment({ type, source, offset, limit }) {
  return request({
    url: "v1_0/comments",
    method: "get",
    params: {
      type,
      source,
      offset,
      limit
    }
  });
}
// 添加评论或回复评论
function addFirstComment({ target, content, art_id }) {
  return request({
    url: "v1_0/comments",
    method: "post",
    data: {
      target,
      content,
      art_id
    }
  });
}

export { getdetails, getFirstComment, addFirstComment };
