<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item, index) in goodsList" :key="index" :to="'/home/goodsinfo/'+item.id">
          <div class="crad">
            <van-image
              lazy-load
              :src="item.img_url"
              width="100%"
              height="100%"
              alt="加载失败"
              error-icon="warning-o"
              style="min-height:170px"
            >
              <template v-slot:loading>
                <van-loading />
                <van-loading type="spinner" />
              </template>
            </van-image>
            <span style="padding: 5px;font-size:14px;">{{item.title}}</span>
            <div style="padding: 5px;background-color:#ECEEEB;">
              <span style="color:red;">￥{{item.sell_price}}</span>&nbsp;&nbsp;&nbsp;
              <span
                style="text-decoration:line-through;font-size:13px"
              >￥{{item.market_price}}</span>
              <div class="bottom">
                <div class="bottom-b">
                  <span>热买中</span>
                  <span>剩余{{item.stock_quantity}}件</span>
                </div>
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      goodsList: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.getGoodsByPage();
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.goodsList = [];
        this.refreshing = false;
      }
      this.page++;
      this.getGoodsByPage();
      this.loading = false;
    },
    async getGoodsByPage() {
      const { data } = await this.$http.get(
        "/api/getgoods?pageindex=" + this.page
      );
      if (data.status === 0) {
        this.goodsList = this.goodsList.concat(data.message);
      }
      // 数据全部加载完成
      if (data.message.length <= 0) {
        this.finished = true;
      }
    }
  }
};
</script>

<style scoped>
.crad {
  padding: 0px;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 5px gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom-b {
  font-size: 13px;
  color: #999;
  display: flex;
  justify-content: space-between;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
</style>