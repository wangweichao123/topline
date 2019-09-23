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
    <div>
      <comment></comment>
    </div>
    <!-- 底部搜索框 -->
    <div class="bottom">
      <van-field left-icon="edit" placeholder="写评论" v-model="words" />
      <van-button type="info" size="small">发送</van-button>
      <van-icon name="star-o" />
    </div>
  </div>
</template>

<script>
import comment from "@/views/details/components/comment"
import userinfo from "@/views/details/components/userinfo"
import articletent from "@/views/details/components/articletent"
// 导入api
import { getdetails } from "@/api/details.js"
export default {
  components:{
    comment,
    userinfo,
    articletent
  },
  data() {
    return {
      id: this.$route.params.id,
      words: "",
      detailsList:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 获取文章详情
    async getArticleInfo(){
      let res = await getdetails(this.id);
      this.detailsList = res
    }
  },
  mounted() {
    this.getArticleInfo()
  },
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
  .bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    
    .van-field{
      background-color: #eee;
      border-radius: 20px;
      margin: 0 5px;
    }
    .van-button{
      border-radius: 4px;
      margin-right: 10px;
    }
  }
}
</style>