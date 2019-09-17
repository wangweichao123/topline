import request from "@/utils/request";

function getArticle() {
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

export { getArticle }