<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" height="150">
      <van-swipe-item v-for="(item, index) in lubotu" :key="index">
          <img v-lazy="item.img">
      </van-swipe-item>
    </van-swipe>
    <h3>HomeContainer</h3>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
    data() {
        return {
            lubotu:[]//轮播图数组
        }
    },
    created() {
        this.getLunbotu()
    },
    methods: {
        async getLunbotu(){
            const {data} = await this.$http.get('/api/getlunbo')
            // console.log(data);
            if(data.status===0) this.lubotu=data.message
        }
    },
};
</script>

<style scoped>
.my-swipe .van-swipe-item img {
    width: 100%;
    height: 100%;
  }
</style>