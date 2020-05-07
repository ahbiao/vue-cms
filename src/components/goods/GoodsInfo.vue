<template>
  <div style="background-color:#eee;overflow:hidden">
    <!-- 轮播区域 -->
    <van-cell class="cell001">
      <swiper :images="images" :imgname="'src'"></swiper>
    </van-cell>
    <van-panel :title="goodsinfo.title">
      <template #default>
        <van-cell>
        <template #title>
            市场价：<span><del>￥{{goodsinfo.market_price}}</del></span>
        </template>
        <template #default>
            销售价：<span style="color:red;font-weight:bold;">￥{{goodsinfo.sell_price}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
            购买数量：
        </template>
        <template #default>
            <van-stepper v-model="number" :max="max" />
        </template>
      </van-cell>
      </template>
      <template #footer>
        <van-button round color="#BE99FF">加购物车</van-button>
        <van-button round color="#7232DD">立即购买</van-button>
      </template>
    </van-panel>
    <van-panel title="参数列表">
      <template #default>
        <van-cell>
          <div>
            商品货号：{{goodsinfo.goods_no}}
          </div>
          <div>
            库存：{{goodsinfo.stock_quantity}}件
          </div>
          <div>
            上架时间：{{goodsinfo.add_time|dateFormat}}
          </div>
        </van-cell>
      </template>
      <template #footer>
        <van-button plain block type="info" size="lager" :to="'/home/goodsdesc/'+goodsinfo.id">图文介绍</van-button>
        <br>
        <van-button plain block type="danger">商品评论</van-button>
      </template>
    </van-panel>
  </div>
</template>

<script>
import swiper from "../sub-components/Swiper.vue";
export default {
  data() {
    return {
      images: [],
      number:0,
      goodsinfo:{},
      max:0,
    };
  },
  created() {
    this.getImg();
    this.getGoodsInfo()
  },
  methods: {
    async getImg() {
      //获取缩略图
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) {
        return (this.images = data.message);
      }
    },
    async getGoodsInfo(){
      const {data}=await this.$http.get('/api/goods/getinfo/'+this.id)
      if(data.status===0) return this.goodsinfo=data.message[0]
    }
  },
  props: ["id"],
  components: {
    swiper
  },
  watch: {
    goodsinfo:function(newval,oldval){
     this.max=newval.stock_quantity;
    }
  },
};
</script>

<style scoped>
.my-swipe,
.van-swipe {
  height: 375px;
}

.cell001,.van-panel {
  margin: 10px 0;
}
.van-panel__footer {
  text-align: right;
}
.van-panel__header {
  font-size: 16px;
  font-weight: bold;
}
</style>