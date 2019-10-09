<template>
  <div class="my-content">
    <van-cell>
      <template slot="title">
        <div class="content">
          <div v-for="(item,index) in detailsList" :key="index" v-html="detailsList.content"></div>
        </div>
        <div class="like">
          <van-button
            size="small"
            type="danger"
            v-if="detailsList.attitude==-1"
            @click="zan(detailsList.art_id)"
          >点赞</van-button>
          <van-button size="small" type="default" v-else @click="diszan(detailsList.art_id)">取消点赞</van-button>
          <van-button
            size="small"
            type="warning"
            v-if="!detailsList.attitude==0"
            @click="like(detailsList.art_id)"
          >不喜欢</van-button>
          <van-button size="small" type="default" v-else @click="dislike(detailsList.art_id)">取消不喜欢</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { dozan, dodiszan, dolike, dodislike } from "@/api/user";
export default {
  props: ["detailsList"],
  data() {
    return {};
  },
  methods: {
    async zan(art_id) {
      await dozan(art_id);
      this.detailsList.attitude = 1
    },
    async diszan(art_id) {
      await dodiszan(art_id);
      this.detailsList.attitude = -1
    },
    async like(art_id) {
      await dolike(art_id);
      this.detailsList.attitude = 0
    },
    async dislike(art_id) {
      await dodislike(art_id);
      this.detailsList.attitude = 1
    }
  }
};
</script>

<style lang="less" scoped>
.my-content {
  width: 100%;
  .van-cell__title {
    width: 100%;
    .content {
      font-size: 14px;
      margin: 10px 0;
      width: 100%;
    }
  }
  .like {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
}
</style>