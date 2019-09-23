// 封装搜索相关的请求
import request from "@/utils/request"

// 关键词联想搜索
function getkeywords(keywords) {
    return request({
        url:'v1_0/suggestion',
        method: 'get',
        params:{
            q:keywords
        }
    })
}

// 获取搜索结果
function getsearchResult({page,keywords}) {
    return request({
        url: 'v1_0/search',
        method: 'get',
        params:{
            page,
            q:keywords
        }
    })
}

export { getkeywords, getsearchResult }