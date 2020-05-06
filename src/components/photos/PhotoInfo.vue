<template>
  <div class="box">
    <div class="title">{{imgInfo.title}}</div>
    <div class="info">
      <span>发布时间：{{imgInfo.add_time|dateFormat}}</span>
      <span>点击：{{imgInfo.click}}</span>
    </div>
    <van-grid :column-num="3" :border="false" clickable>
      <van-grid-item v-for="(img,i) in images" :key="i" @click="show=true;startPosition=i">
        <van-image lazy-load :src="img">
          <template v-slot:loading>
            <van-loading type="spinner" size="30" />
          </template>
        </van-image>
      </van-grid-item>
    </van-grid>
    <div class="content" v-html="imgInfo.content"></div>
    <comment :newsid="id"></comment>
    <van-image-preview v-model="show" :images="images" @change="onChange" closeable :start-position="startPosition">
      <template v-slot:index>第{{ index+1 }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
import comment from "../sub-components/Comment.vue";
export default {
  data() {
    return {
      show: false,
      index: 0,
      images: [],
      startPosition:0,
      imgInfo: {}
    };
  },
  created() {
    this.getimginfo();
    this.getThumbImg();
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    async getimginfo() {
      //获取图片详情
      const { data } = await this.$http.get("/api/getimageinfo/" + this.id);
      //   console.log(data);
      if (data.status === 0) return (this.imgInfo = data.message[0]);
    },
    async getThumbImg() {
      //获取缩略图
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) {
        var src = data.message;
        for (var i = 0; i < src.length; i++) {
          this.images.push(src[i].src);
        }
      }
    }
  },
  props: ["id"],
  components: {
    comment
  }
};
</script>

<style scoped>
.box {
  padding: 5px;
  color: #666;
}
.title {
  font-size: 14px;
  color: red;
  text-align: center;
  margin: 10px auto;
}
.info {
  color: #ccc;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.van-image{
    box-shadow: 0 0 10px gray;
    
}
</style>