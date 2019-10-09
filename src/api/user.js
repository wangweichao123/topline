// 用户相关的api
import request from "@/utils/request";

// 关注用户
function focusUser(aut_id) {
  return request({
    url: "v1_0/user/followings",
    method: "post",
    data: {
      target: aut_id
    }
  });
}
// 取关用户
function disfocusUser(aut_id) {
  return request({
    url: `v1_0/user/followings/${aut_id}`,
    method: "delete"
  });
}
// 点赞
function dozan(art_id) {
  return request({
    url: `v1_0/article/likings`,
    method: "post",
    data: {
      target: art_id
    }
  });
}
// 取消点赞
function dodiszan(art_id) {
  return request({
    url: `v1_0/article/likings/${art_id}`,
    method: "delete"
  });
}
// 对文章不喜欢
function dolike(art_id) {
  return request({
    url: `v1_0/article/dislikes`,
    method: "post",
    data: {
      target: art_id
    }
  });
}
// 取消对文章不喜欢
function dodislike(art_id) {
  return request({
    url: `v1_0/article/dislikes/${art_id}`,
    method: "delete"
  });
}

// 修改用户头像
function setUserIcon(photo) {
  // axios ---> XMLHttprequest 对象
  //    ----> 默认不允许传递文件
  //    ----> formDate
  // 将 photo 转换为 formDate
  var fd = new FormData();
  fd.append("photo", photo);
  return request({
    url: "v1_0/user/photo",
    method: "PATCH",
    data: fd
  });
}

export { focusUser, disfocusUser, dozan, dodiszan, dolike, dodislike, setUserIcon };
