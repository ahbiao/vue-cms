<template>
  <div style="background-color:#eee;overflow:hidden">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>
    <!-- 轮播区域 -->
    <van-cell class="cell001">
      <swiper :images="images" :imgname="'src'"></swiper>
    </van-cell>
    <van-panel :title="goodsinfo.title">
      <template #default>
        <van-cell>
          <template #title>
            市场价：
            <span>
              <del>￥{{goodsinfo.market_price}}</del>
            </span>
          </template>
          <template #default>
            销售价：
            <span style="color:red;font-weight:bold;">￥{{goodsinfo.sell_price}}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>购买数量：</template>
          <template #default>
            <van-stepper v-model="number" :max="max" />
          </template>
        </van-cell>
      </template>
      <template #footer>
        <van-button round color="#BE99FF" @click="addToCart">加购物车</van-button>
        <van-button round color="#7232DD">立即购买</van-button>
      </template>
    </van-panel>
    <van-panel title="参数列表">
      <template #default>
        <van-cell>
          <div>商品货号：{{goodsinfo.goods_no}}</div>
          <div>库存：{{goodsinfo.stock_quantity}}件</div>
          <div>上架时间：{{goodsinfo.add_time|dateFormat}}</div>
        </van-cell>
      </template>
      <template #footer>
        <van-button plain block type="info" size="lager" :to="'/home/goodsdesc/'+goodsinfo.id">图文介绍</van-button>
        <br />
        <van-button plain block type="danger" :to="'/home/goodscomment/'+goodsinfo.id">商品评论</van-button>
      </template>
    </van-panel>
  </div>
</template>

<script>
import swiper from "../sub-components/Swiper.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      images: [],
      number: 0, //购买数量
      goodsinfo: {},
      max: 0, //库存
      flag: false
    };
  },
  created() {
    this.getImg();
    this.getGoodsInfo();
  },
  methods: {
    ...mapMutations(["addToCar"]),
    async getImg() {
      //获取缩略图
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) {
        return (this.images = data.message);
      }
    },
    async getGoodsInfo() {
      const { data } = await this.$http.get("/api/goods/getinfo/" + this.id);
      if (data.status === 0) return (this.goodsinfo = data.message[0]);
    },
    beforeEnter(el) {
      //入场动画开始前
      const a = document
        .getElementsByTagName("input")[0]
        .getBoundingClientRect();
      el.style.top = a.top + "px";
      el.style.left = a.left + "px";
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //入场动画后
      el.offsetWidth;
      const a = document
        .getElementsByTagName("input")[0]
        .getBoundingClientRect();
      const b = document
        .getElementsByClassName("van-info")[0]
        .getBoundingClientRect();
      const top = b.top - a.top;
      const left = b.left - a.left;
      el.style.transform = `translate(${left}px,${top}px)`;
      el.style.transition = "all .5s cubic-bezier(.37,-0.3,1,.48)";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },

    addToCart() {
      this.flag = !this.flag;
      this.addToCar({ id: this.id, count: this.number, selected: true ,price:this.goodsinfo.sell_price});
      // this.$store.commit('addToCar',{id:this.id,count:this.number})
    }
  },
  props: ["id"],
  components: {
    swiper
  },
  watch: {
    goodsinfo: function(newval, oldval) {
      this.max = newval.stock_quantity;
    }
  }
};
</script>

<style scoped>
.cell001 {
  height: 200px;
}
.cell001,
.van-panel {
  margin: 10px 0;
}
.van-panel__footer {
  text-align: right;
}
.van-panel__header {
  font-size: 16px;
  font-weight: bold;
}
.ball {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 370px;
  right: 54px;
  /* transform: translate(-130px, 150px); */
}
</style>