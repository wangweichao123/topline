<template>
  <div>
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <!-- 一级评论 -->
      <van-cell>
        <template slot="title">
          <div class="userInfo">
            <img :src="detailsList.aut_photo" />
            <span>{{ detailsList.aut_name }}</span>
            <van-icon name="good-job-o" />
            {{ detailsList.like_count }}
          </div>
        </template>
        <template slot="label">
          <div class="timeInfo">{{ detailsList.content }}</div>
          <div class="callback">
            <span>{{ detailsList.pubdate | timeformat }}</span>
          </div>
        </template>
      </van-cell>
      <!-- 二级评论 -->
      <div>评论回复:</div>
      <van-list
        v-model="uploading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getcommentback"
      >
        <div v-for="(item,index) in lost" :key="index">
          <van-cell>
            <template slot="title">
              <div class="userInfo">
                <img :src="item.aut_photo" />
                <span>{{ item.aut_name }}</span>
                <van-icon name="good-job-o" />
                {{ item.like_count }}
              </div>
            </template>
            <template slot="label">
              <div class="timeInfo">{{ item.content }}</div>
              <div class="callback">
                <span>{{ item.pubdate | timeformat }}</span>
              </div>
            </template>
          </van-cell>
        </div>
      </van-list>
      <!-- 底部搜索框 -->
      <div class="bottom">
        <van-field left-icon="edit" placeholder="写评论" v-model="words" @keyup.enter="addcomment()" />
        <van-button type="info" size="small" @click="addcomment">发送</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import { getFirstComment, addFirstComment } from "@/api/details.js";
export default {
  props: ["artid"],
  data() {
    return {
      show: false,
      detailsList: "",
      words: "",
      lost: [],
      uploading: false,
      finished: false,
      offset: null,
      end_id: 0,
      limit: 10
    };
  },
  methods: {
    async addcomment() {
      let res = await addFirstComment({
        target: this.detailsList.com_id,
        content: this.words,
        art_id: this.artid
      });
      //   console.log(res);
      this.lost.unshift(res.new_obj);
      this.words = "";
    },
    // 获取评论回复的数据
    async getcommentback() {
      // console.log(this.detailsList);
      if (this.offset === this.end_id) {
        this.uploading = false;
        this.finished = true;
        return;
      }
      // 判断是否是第一次获取
      if (!this.offset) {
        let res = await getFirstComment({
          type: "c",
          source: this.detailsList.com_id,
          limit: this.limit
        });
        // console.log(res);
        this.lost = res.results;
        this.end_id = res.end_id;
        this.offset = res.last_id;
      } else {
        let res = await getFirstComment({
          type: "c",
          source: this.detailsList.com_id,
          offset: this.offset,
          limit: this.limit
        });
        this.lost = [...this.lost, ...res.results];
        this.offset = res.last_id;
      }
      this.uploading = false;
    }
  },
  created() {
    eventBus.$on("showcom", obj => {
      // console.log(obj);
      this.show = obj.show;
      this.detailsList = obj;
    });
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
  span {
    flex: 1;
    font-size: 12px;
  }
}
.timeInfo {
  margin-left: 45px;
  margin-top: -14px;
  font-size: 14px;
  color: black;
}
.callback {
  margin-left: 45px;
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
</style>