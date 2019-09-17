// 封装保存,获取及删除本地token的方法
function setToken(token) {
    window.localStorage.setItem('token',JSON.stringify(token))
}

function getToken() {
    return window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token')) : null
}

function removeToken() {
    window.localStorage.removeItem('token')
}


export {
    setToken,
    getToken,
    removeToken
}