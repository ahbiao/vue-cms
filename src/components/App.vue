<template>
  <div class="app-container">
    <!-- navbar -->
    <van-nav-bar title="Vue项目" left-text="返回" left-arrow fixed placeholder></van-nav-bar>
    <!-- 路由容器 -->
    <transition>
      <router-view />
    </transition>
    <!-- tabbar -->
    <van-tabbar v-model="active" route fixed placeholder>
      <van-tabbar-item replace icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item replace icon="shopping-cart-o" to="/shopcar" badge="0">购物车</van-tabbar-item>
      <van-tabbar-item replace icon="contact" to="/member">会员</van-tabbar-item>
      <van-tabbar-item replace icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  computed: {
    
  },
};
</script>

<style scoped>
.app-container{
  /* 切换组件时，宽度会增加两倍，此时需要隐藏超过屏幕的区域 */
  overflow: hidden;
}
/* 路由动画效果 */
.v-enter,
v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leaveactive {
  transition: all 0.5s ease;
}
</style>