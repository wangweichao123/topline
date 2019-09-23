// 封装文章详情相关的api
import request from "@/utils/request.js"

// 获取对应文章的详情
function getdetails(art_id) {
    return request({
        url:`v1_0/articles/${art_id}`,
        method:'get'
    })
}

export { getdetails }