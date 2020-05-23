<template>
  <van-swipe :autoplay="3000" class="my-swipe" style="height:100%;">
    <van-swipe-item v-for="(image, index) in images" :key="index" style="height:100%;">
      <van-image error-icon="warning-o" lazy-load :src="image[imgname]" height="100%" width="100%" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['images','imgname']
};
</script>

<style scoped>
</style>