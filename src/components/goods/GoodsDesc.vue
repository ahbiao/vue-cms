<template>
   <div class="goodsdesc-box">
    <div class="title">{{info.title}}</div>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            info:{}
        }
    },
    created() {
        this.getGoodsDesc()
    },
    methods: {
        async getGoodsDesc(){
            const {data}=await this.$http.get('/api/goods/getdesc/'+this.id)
            if(data.status===0) return this.info=data.message[0]
        }
    },
    props:['id']
}
</script>

<style>
.goodsdesc-box{
    padding: 5px;
    color: #666;
}
.goodsdesc-box .title{
    font-size: 14px;
    color:red;
    text-align: center;
    margin: 10px auto;
}
.goodsdesc-box .content img{
    width: 100%;
}
</style>