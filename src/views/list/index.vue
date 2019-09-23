<template>
  <div class="list">
    <van-nav-bar
      fixed
      title="内容列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :zIndex="100"
    />
    <van-cell-group>
      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
        <van-list v-model="uploading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in list" :key="index">
            <template slot="title">
              <div @click="$router.push(`/details/${item.art_id}`)" >
                {{ item.title }}
              </div>
            </template>
            <template slot="label">
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-if="item.cover.type">
                  <van-image :src="img.images" v-for="img in item.cover" :key="img.type" />
                </van-grid-item>
              </van-grid>
              <div>
                <van-grid :column-num="3" clickable>
                  <van-grid-item text="评论" @click="comment" />
                  <van-grid-item text="点赞" />
                  <van-grid-item text="收藏" />
                </van-grid>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getsearchResult } from "@/api/search";
export default {
  data() {
    return {
      key: this.$route.params.key,
      page: 0,
      list: [],
      uploading: false,
      finished: false,
      pullLoading: false
    };
  },
  methods: {
    // 评论
    comment() {
      // 登录验证
      this.$judgelogin();
    },
    // 下拉刷新
    async onRefresh() {
      this.page++;
      let res = await getsearchResult({
        page: this.page,
        keywords: this.key
      });
      this.list = res.results;
      this.pullLoading = false;
    },
    // 上拉加载更多
    async onLoad() {
      this.page++;
      let res = await getsearchResult({
        page: this.page,
        keywords: this.key
      });
      this.list = [...this.list, ...res.results];
      this.uploading = false;
    },
    onClickLeft() {
      this.$router.push("/search");
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.list {
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
}
</style>