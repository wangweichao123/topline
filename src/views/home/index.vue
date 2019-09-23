<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="tabActive">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <van-pull-refresh v-model="item.downloading" @refresh="onRefresh">
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(it, index) in item.article" :key="index" :title="it.title">
              <template slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in it.cover.images" :key="index">
                    <van-image :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>
                <div class="authorInfo">
                  <div>
                    <span>作者 {{ it.aut_name }}</span>
                    <span>评论 {{ it.comm_count }}</span>
                    <span>{{ it.pubdate | changeTime }}</span>
                  </div>
                  <van-icon name="close" @click="dialog(it)" />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div slot="nav-right" class="myicon" @click="show = !show">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <dialogmore v-model="dialogshow" :currentArticle="currentArticle"></dialogmore>
    <popup v-model="show" :channel.sync="channelList" :active.sync="tabActive"></popup>
  </div>
</template>

<script>
import { userChannel } from "@/api/channel";
import { getArticle } from "@/api/article";
import popup from "@/views/home/popup";
import dialogmore from "@/views/home/dialogmore";
export default {
  components: {
    popup,
    dialogmore
  },
  data() {
    return {
      tabActive: 0,
      show: false,
      channelList: [],
      dialogshow: false,
      currentArticle: []
    };
  },
  methods: {
    dialog(it) {
      this.dialogshow = true;
      this.currentArticle = it;
    },
    // 上拉加载更多
    onLoad() {
      this.getArticle();
    },
    // 下拉刷新
    onRefresh() {
      let currentChannel = this.channelList[this.tabActive];
      currentChannel.article = [];
      currentChannel.downloading = false;
      currentChannel.uploading = false;
      currentChannel.finished = false;
      currentChannel.pre_timestamp = 0;
      this.onLoad();
      console.log(currentChannel);
    },
    // 获取用户频道
    async getchannel() {
      // 判断用户是否登录
      if (this.$store.state.user && this.$store.state.user.token) { // 登录
        let res = await userChannel();
        this.channelList = res.channels;
        this.addAttr();
      } else { // 未登录,则判断本地中有无频道数据
        let localChannel = JSON.parse(window.localStorage.getItem("channel"));
        if (localChannel) {
          this.channelList = localChannel;
          this.addAttr();
        } else {
          let res = await userChannel();
          this.channelList = res.channels;
          this.addAttr();
        }
      }
    },
    // 给channelList添加属性的方法
    addAttr() {
      this.channelList.forEach(item => {
        this.$set(item, "article", []);
        this.$set(item, "uploading", false);
        this.$set(item, "finished", false);
        this.$set(item, "downloading", false);
        this.$set(item, "pre_timestamp", 0);
      });
    },
    // 获取当前频道的文章
    async getArticle() {
      // 获取当前频道的id
      let currentChannel = this.channelList[this.tabActive];
      // 若无数据,pre_timestamp会返回null
      if (currentChannel.pre_timestamp == null) {
        currentChannel.uploading = false;
        currentChannel.finished = true;
        return;
      }
      // 判断是否是第一次获取文章列表
      if (currentChannel.pre_timestamp === 0) {
        let res = await getArticle({
          channel_id: currentChannel.id,
          timestamp: Date.now(),
          with_top: 1
        });
        // console.log(res);
        currentChannel.article = res.results;
        // 保存获取下一页需要的时间戳
        currentChannel.pre_timestamp = res.pre_timestamp;
      } else {
        let res = await getArticle({
          channel_id: currentChannel.id,
          timestamp: currentChannel.pre_timestamp,
          with_top: 1
        });
        // console.log(res);
        currentChannel.article = [...currentChannel.article, ...res.results];
        // 保存获取下一页需要的时间戳
        currentChannel.pre_timestamp = res.pre_timestamp;
      }
      currentChannel.uploading = false;
    }
  },
  mounted() {
    this.getchannel();
  }
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
  z-index: 1000;
  width: 90%;
}
.myicon {
  position: fixed;
  top: 46px;
  right: 5px;
  width: 10%;
  height: 44px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.authorInfo {
  display: flex;
  justify-content: space-between;
  span {
    margin-right: 10px;
  }
}
</style>