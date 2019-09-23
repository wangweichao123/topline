<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="userInfo">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>作者名</span>
          <van-icon name="good-job-o" />666
        </div>
      </template>
      <template slot="label">
        <div class="timeInfo">时间·央视网新闻频道官方</div>
        <div class="callback">
            <span>09-21 9:10</span>
            <span>·回复</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
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