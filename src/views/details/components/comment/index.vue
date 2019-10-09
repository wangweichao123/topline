<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="userInfo">
          <img :src="detailsList.aut_photo" />
          <span>{{ detailsList.aut_name }}</span>
          <van-icon name="good-job-o" />{{ detailsList.like_count }}
        </div>
      </template>
      <template slot="label">
        <div class="timeInfo">{{ detailsList.content }}</div>
        <div class="callback">
            <span>{{ detailsList.pubdate | timeformat }}</span>
            <span @click="callback(detailsList)">·回复</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>
<script>
import eventBus from "@/utils/eventBus"
import { getFirstComment } from '@/api/details'
export default {
  props:['detailsList'],
  data() {
    return {
      
    }
  },
  methods: {
    callback(detailsList){
      eventBus.$emit('showcom',{
        show:true,
        ...detailsList
      })
    }
  },
  mounted() {
    
  },
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
  .callback{
      margin-left: 45px;
  }
</style>