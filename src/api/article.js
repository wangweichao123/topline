import request from "@/utils/request";
// 获取所有文章列表
function getArticle({channel_id,timestamp,with_top}) {
  return request({
    url: "v1_1/articles",
    method: "get",
    params: {
      channel_id,
      timestamp,
      with_top
    }
  });
}
// 发送不喜欢文章请求
function dislikeArticle(id) {
  return request({
    url: "v1_0/article/dislikes",
    method: "post",
    data: {
      target:id
    }
  });
}
// 举报文章
function reportArticle({target,type}) {
  return request({
    url: "v1_0/article/reports",
    method: "post",
    data: {
      target,
      type,
      remark:'举报'
    }
  });
}
// 拉黑用户
function blackUser(target) {
  return request({
    url: "v1_0/user/blacklists",
    method: "POST",
    data: {
      target,
    }
  });
}



export { getArticle, dislikeArticle, reportArticle, blackUser }