<template>
  <van-dialog
    closeOnClickOverlay
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    :showCancelButton="false"
    show-cancel-button
    :beforeClose="dobefore"
  >
    <div v-if="!showreport">
      <van-cell title="隐藏文章" icon="shop-o" @click="hadeArticle" />
      <van-cell title="举报文章" icon="shop-o" is-link @click="showreport = true" />
      <van-cell title="拉黑作者" icon="shop-o" @click="blackList" />
    </div>
    <div v-else>
      <van-cell icon="arrow-left" @click="showreport = false" />
      <van-cell
        :title="item.title"
        v-for="item in reportList"
        :key="item.id"
        @click="report(item.id)"
      />
    </div>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle, blackUser } from "@/api/article";
export default {
  props: ["value", "currentArticle"],
  data() {
    return {
      showreport: false,
      reportList: [
        { id: 0, title: "其他问题" },
        { id: 1, title: "标题夸张" },
        { id: 2, title: "低俗色情" },
        { id: 3, title: "错别字多" },
        { id: 4, title: "旧闻重复" },
        { id: 5, title: "广告软文" },
        { id: 6, title: "内容不实" },
        { id: 7, title: "涉嫌违法犯罪" },
        { id: 8, title: "侵权" }
      ]
    };
  },
  methods: {
    //  提示框退出前
    dobefore(action, done) {
      this.showreport = false;
      done();
    },
    // 拉黑作者
    async blackList() {
      try {
        await blackUser(this.currentArticle.aut_id);
        this.$toast.success("拉黑作者成功!");
      } catch (error) {
        this.$toast.fail("拉黑失败或未登录");
      } finally {
        this.$emit("input", false);
      }
    },
    // 隐藏文章
    async hadeArticle() {
      // 用户登录才能操作
      try {
        let res = await dislikeArticle(this.currentArticle.art_id);
        this.$toast.success("隐藏文章成功");
      } catch (error) {
        this.$toast.fail("隐藏文章失败,或未登录!");
      } finally {
        this.$emit("input", false);
      }
    },
    // 举报文章
    async report(type) {
      try {
        let res = await reportArticle({
          target: this.currentArticle.art_id,
          type
        });
        this.$toast.success("举报成功!");
      } catch (error) {
        // console.log(error.response);
        // console.log(error.message);
        // if (error.message.includes("409")) {
        if (error.response.status == 409) {
          this.$toast.fail("已被举报!");
        } else {
          this.$toast.fail("举报失败!");
        }
      } finally {
        this.showreport = false;
        this.$emit("input", false);
      }
    }
  }
};
</script>

<style>
</style>