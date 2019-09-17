<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="tabActive">
      <van-tab :title="item.name" v-for="item in channelList.channels" :key="item.id" >
        <van-list v-model="uploading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <div slot="nav-right" class="myicon" @click="show = !show">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <van-grid :column-num="4">
        <van-grid-item v-for="value in 16" :key="value" icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { userChannel } from "@/api/channel"
import { getArticle } from "@/api/article"
export default {
  data() {
    return {
      tabActive: 0,
      uploading: false,
      finished: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      show: false,
      channelList:[]
    };
  },
  methods: {
    // 获取用户频道
    async getchannel(){
        // 判断用户是否登录
        if (this.$store.state.user) {
            // 登录
            let res = await userChannel();
            this.channelList.channels = res.channels
            this.channelList = { ...this.channelList }
        }else{
            let res = await userChannel();
            this.channelList = res.channels
        }
    },
    // 获取当前频道的文章
    getArticle(){

    },
    onLoad() {}
  },
  mounted() {
      this.getchannel();
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 90px;
}
.van-nav-bar__title {
  background-color: #3296fa;
  color: #fff;
  max-width: 100%;
}
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  width: 90%;
  z-index: 100;
}
.myicon {
  position: fixed;
  top: 55px;
  right: 10px;
}
</style>