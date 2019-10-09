<template>
  <div class="myset">
    <van-nav-bar fixed title="个人信息" left-arrow @click-left="$router.back()" :zIndex="100">
      <template slot="right">
        <div class="save">保存</div>
      </template>
    </van-nav-bar>
    <van-cell title="头像" is-link @click="pop">
      <template slot="default">
        <div class="myimg">
          <img src="../../../assets/zjl.jpg" alt />
        </div>
      </template>
    </van-cell>
    <van-cell title="昵称" is-link value="圈圈789" />
    <van-cell title="介绍" is-link/>
    <van-cell title="性别" is-link value="女" />
    <van-cell title="生日" is-link value="待完善" />
    <usericon v-model="show"></usericon>
  </div>
</template>

<script>
import usericon from './components/usericon.vue'
export default {
    components:{
        usericon
    },
    data() {
        return {
            show:false
        }
    },
    methods: {
        pop(){
            this.show=true
        }
    },
};
</script>

<style lang="less" scoped>
.myset {
  margin-top: 46px;
  .van-nav-bar {
    background-color: #3296fa;
    max-width: 100%;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .myimg {
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
}
.save {
  color: #fff;
}
</style>