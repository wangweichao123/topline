// 封装频道相关的请求

import request from "@/utils/request";
// 获取用户频道
function userChannel() {
  return request({
    url: "v1_0/user/channels",
    method: "get"
  });
}
// 获取所有频道
function allChannel() {
  return request({
    url:'v1_0/channels',
    method: 'get'
  })
}

// 设置用户频道
function setUserChannel({channels}){
  return request({
    url: 'v1_0/user/channels',
    method: 'put',
    data:{
      channels:channels
    }
  })
}

export { userChannel, allChannel, setUserChannel };
