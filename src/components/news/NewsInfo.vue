<template>
  <div class="box">
    <div class="title">{{info.title}}</div>
    <div class="info"><span>发布时间：{{info.add_time|dateFormat}}</span><span>点击：{{info.click}}</span></div>
    <div class="content" v-html="info.content"></div>
    <!-- 父组件向子组件传值 -->
    <comment :newsid="id"></comment>
  </div>
</template>

<script>
import comment from '../sub-components/Comment.vue'
export default {
  props: ["id"],
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async getNewsInfo() {
      const { data } = await this.$http.get("/api/getnew/" + this.id);
      if (data.status === 0) return (this.info = data.message[0]);
    }
  },
  created() {
    this.getNewsInfo();
  },
  components:{
      comment
  }
};
</script>

<style scoped>
.box{
    padding: 5px;
    color: #666;
}
.title{
    font-size: 14px;
    color:red;
    text-align: center;
    margin: 10px auto;
}
.info{
    color: #ccc;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
}
</style>