// 封装频道相关的请求

import request from "@/utils/request";

function userChannel() {
  return request({
    url: "v1_0/user/channels",
    method: "get"
  });
}

export { userChannel };
