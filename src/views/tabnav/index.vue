<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="home">标签</van-tabbar-item>
    <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="my">标签</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active:0
        }
    },
};
</script>

<style>
</style>