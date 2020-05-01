<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="Vue项目" left-text="返回" left-arrow fixed placeholder></van-nav-bar>
    <!-- 路由容器 -->
    <router-view></router-view>
    <!-- tabbar -->
    <van-tabbar v-model="active" route fixed placeholder>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopcar" badge="0">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/member">会员</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
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

<style scoped>
</style>