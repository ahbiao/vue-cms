<template>
  <div class="app-container">
    <!-- navbar -->
    <van-nav-bar title="Vue项目" left-text="返回" left-arrow fixed placeholder @click-left="back"></van-nav-bar>
    <!-- 路由容器 -->
    <transition>
      <router-view />
    </transition>
    <!-- tabbar -->
    <van-tabbar v-model="active" fixed placeholder>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopcar" :badge="totalcount">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/member">会员</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    $route: function() {
      switch (this.$route.path) {
        case "/home":
          this.active = 0;
          break;
        case "/shopcar":
          this.active = 1;
          break;
        case "/member":
          this.active = 2;
          break;
        case "/search":
          this.active = 3;
          break;
      }
    }
  },
  computed: {
    ...mapGetters(['totalcount'])
  },
};
</script>

<style scoped>
.app-container {
  /* 切换组件时，宽度会增加两倍，此时需要隐藏超过屏幕的区域 */
  width: 100%;
  overflow: hidden;
}

/* 路由动画效果 */
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  /* opacity: 0; */
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  width: 100%;
  transition: all 0.4s ease;
}
</style>
