<template>
  <div class="mydetails">
    <van-nav-bar
      fixed
      title="内容详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :zIndex="100"
    />
    <van-cell>
      <template slot="title">
        <div class="title">{{ detailsList.title }}</div>
      </template>
    </van-cell>
    <!-- 用户信息 -->
    <userinfo :detailsList="detailsList"></userinfo>
    <!-- 内容 -->
    <articletent :detailsList="detailsList"></articletent>
    <!-- 评论 -->
    <van-list v-model="uploading" :finished="finished" finished-text="没有更多了" @load="getAllComment">
      <div v-for="(item,index) in commentList" :key="index">
        <comment :detailsList="item"></comment>
      </div>
    </van-list>
    <commentback :artid="id"></commentback>
    <!-- 底部搜索框 -->
    <div class="bottom">
      <van-field left-icon="edit" placeholder="写评论" v-model="words" @keyup.enter="addcomment()" />
      <van-button type="info" size="small" @click="addcomment">发送</van-button>
      <van-icon name="star-o" />
    </div>
  </div>
</template>

<script>
import comment from "@/views/details/components/comment";
import userinfo from "@/views/details/components/userinfo";
import articletent from "@/views/details/components/articletent";
import commentback from "@/views/details/components/commentback"
// 导入api
import { getdetails, getFirstComment, addFirstComment } from "@/api/details.js";

export default {
  components: {
    comment,
    userinfo,
    articletent,
    commentback
  },
  data() {
    return {
      id: this.$route.params.id,
      words: "",
      detailsList: [],
      commentList: [],
      limit: 10,
      offset: null,
      end_id: 0,
      uploading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 获取文章详情
    async getArticleInfo() {
      let res = await getdetails(this.id);
      this.detailsList = res;
    },
    // 获取所有评论
    async getAllComment() {
      // console.log(this.detailsList);
      // 判断是否获取完所有评论
      if (this.offset === this.end_id) {
        this.uploading = false;
        this.finished = true;
        return;
      }
      // 判断是否是第一次获取
      if (!this.offset) {
        let res = await getFirstComment({
          type: "a",
          source: this.id,
          limit: this.limit
        });
        this.commentList = res.results;
        this.end_id = res.end_id;
        this.offset = res.last_id;
      } else {
        let res = await getFirstComment({
          type: "a",
          source: this.id,
          offset: this.offset,
          limit: this.limit
        });
        this.commentList = [...this.commentList, ...res.results];
        this.offset = res.last_id;
      }
      this.uploading = false;
    },
    // 添加对文章评论
    async addcomment() {
      let res = await addFirstComment({
        target: this.detailsList.art_id,
        content: this.words
      });
      this.commentList.unshift(res.new_obj);
      this.words = "";
    }
  },
  created() {
    this.getArticleInfo();
  }
};
</script>

<style lang="less" scoped>
.mydetails {
  margin-top: 46px;
  margin-bottom: 50px;
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
  .title {
    font-size: 26px;
    font-weight: 400;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    background-color: #fff;

    .van-field {
      background-color: #eee;
      border-radius: 20px;
      margin: 0 5px;
    }
    .van-button {
      border-radius: 4px;
      margin-right: 10px;
    }
  }
}
</style>