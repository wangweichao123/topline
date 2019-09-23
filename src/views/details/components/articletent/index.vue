<template>
  <div class="my-content">
    <van-cell>
      <template slot="title">
        <div class="content">
          <div v-for="(item,index) in detailsList" :key="index" v-html="detailsList.content"></div>
        </div>
        <div class="like">
          <van-button size="small" type="danger" @click="zan">点赞</van-button>
          <van-button size="small" type="default" @click="diszan">取消点赞</van-button>
          <van-button size="small" type="warning" @click="like">不喜欢</van-button>
          <van-button size="small" type="default" @click="dislike">取消不喜欢</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { dozan, dodiszan, dolike, dodislike } from '@/api/user'
export default {
  props: ["detailsList"],
  methods: {
    zan(){
      
    },
    diszan(){

    },
    like(){

    },
    dislike(){

    }
  },
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