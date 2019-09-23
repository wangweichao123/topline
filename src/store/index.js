import Vue from 'vue'
import Vuex from 'vuex'
import * as author from '@/utils/author'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: author.getToken('token')
  },
  mutations: {
    getUser( state, value ){
      author.setToken(value);
      // 操作state存数据
      state.user = value;
    }
  },
  actions: {

  }
})
