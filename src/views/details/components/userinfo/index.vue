<template>
  <van-cell>
    <template slot="title">
      <div class="userInfo">
        <img :src="detailsList.aut_photo" />
        <span>{{ detailsList.aut_name }}</span>
        <van-button
          v-if="!detailsList.is_followed"
          size="small"
          type="danger"
          @click="dofocus(detailsList.aut_id)"
        >关注</van-button>
        <van-button v-else size="small" type="default" @click="disfocus(detailsList.aut_id)">取消关注</van-button>
      </div>
    </template>
    <template slot="label">
      <div class="timeInfo">{{ detailsList.pubdate | changeTime }}</div>
    </template>
  </van-cell>
</template>

<script>
import { focusUser, disfocusUser } from "@/api/user";
export default {
  props: ["detailsList"],
  data() {
    return {};
  },
  methods: {
    async dofocus(aut_id) {
      // 判断用户是否登录
      this.$judgelogin()
      let res = await focusUser(aut_id);
      this.detailsList.is_followed = true;
    },
    async disfocus(aut_id) {
      let res = await disfocusUser(aut_id);
      this.detailsList.is_followed = false;
    }
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  span {
    flex: 1;
  }
  .van-button {
    border-radius: 6px;
  }
}
.timeInfo {
  margin-left: 41px;
  margin-top: -14px;
}
</style>