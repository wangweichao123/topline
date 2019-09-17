// 登录验证相关的请求
// 导入request
import request from '@/utils/request'

function login({mobile,code}) {
    return request({
        url:'v1_0/authorizations',
        method:'post',
        data:{
            mobile,
            code
        }
    })
}

export { login }