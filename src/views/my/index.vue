<template>
  <div class="my">
    <van-nav-bar
      fixed
      title="我的"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      :zIndex="100"
    />
    <div class="myuserinfo">
      <van-cell>
        <template slot="title">
          <div class="user-info" @click="toset">
            <img src="../../assets/zjl.jpg" alt />
            <div class="usertitle">
              <p class="username">黑马zhou</p>
              <p class="renz">申请认证</p>
            </div>
          </div>
          <div class="user-read">
            <i class="iconfont icon-read"></i>
            <div class="readtitle">
              <p class="todayread">今日阅读</p>
              <p class="readtime">5分钟</p>
            </div>
          </div>
          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <div>
                <span>8</span>
                <div>动态</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div>
                <span>68</span>
                <div>关注</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div>
                <span>88</span>
                <div>粉丝</div>
              </div>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="实名认证" is-link />
    <van-cell title="用户反馈" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="系统设置" is-link />
  </div>
</template>

<script>
export default {
  methods: {
    toset(){
      this.$router.push("/myset")
    }
  },
};
</script>

<style lang="less" scoped>
.my {
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
  .myuserinfo {
    .van-cell {
      background-color: #409dfa;
      .user-info {
        display: flex;
        position: relative;

        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .usertitle {
          display: flex;
          flex-direction: column;
          height: 55px;
          .username {
            margin: 0;
            font-size: 14px;
            color: #fff;
          }
          .renz {
            margin-top: 5px;
            height: 14px;
            width: 60px;
            background-color: #fff;
            text-align: center;
            line-height: 14px;
            font-size: 12px;
            color: #3296fa;
            border-radius: 7px;
          }
        }
      }
      .user-read {
        position: fixed;
        right: -2px;
        top: 63px;
        background-color: #3981c9;
        display: flex;
        align-items: center;
        width: 100px;
        height: 40px;
        color: #fff;
        border-radius: 20px 0 0 20px;
        i.icon-read {
          font-size: 20px;
          margin: 0 10px;
        }
        .readtitle {
          font-size: 10px;
          .todayread {
            margin: 0;
            line-height: 14px;
          }
          .readtime {
            margin: 0;
            line-height: 14px;
          }
        }
      }
      .van-grid /deep/ .van-grid-item__content {
        color: #fff;
        background-color: #409dfa;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>