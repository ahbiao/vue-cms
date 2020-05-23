<template>
  <div>
    <van-tabs
      v-model="active"
      color="#26A2FF"
      background="#FAFAFA"
      @click="getImgByCategory"
      animated
    >
      <van-tab v-for="item in imgCategory" :key="item.id" :title="item.title">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group>
              <van-cell
                v-for="img in imgList"
                :key="img.id"
                style="position:relative;"
                :to="'/home/photoinfo/'+img.id"
              >
                <van-image :src="img.img_url" width="100%" lazy-load>
                  <template v-slot:loading>
                    <van-loading type="spinner" size="30" />
                  </template>
                </van-image>
                <div class="title-box">
                  <h3>{{img.title}}</h3>
                  <p>{{img.zhaiyao}}</p>
                </div>
              </van-cell>
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      active: 0,
      imgCategory: [],
      imgList: []
    };
  },
  created() {
    this.getImgCategory();
    this.getImgByCategory(0);
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.imgList = [];
        this.refreshing = false;
      }
      this.getImgByCategory(this.active)
      this.loading = false;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async getImgCategory() {
      const { data } = await this.$http.get("/api/getimgcategory");
      if (data.status === 0) {
        data.message.unshift({ id: 0, title: "全部" });
        this.imgCategory = data.message;
      }
    },
    async getImgByCategory(name) {
      var ids = 0;
      if (name != 0) ids = this.imgCategory[name].id;
      const { data } = await this.$http.get("/api/getimages/" + ids);
      if (data.status === 0) this.imgList = data.message;
      if (data.message.length <= 0 || ids==0) this.finished = true;
    }
  }
};
</script>

<style scoped>
.title-box {
  width: 100%;
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  max-height: 86px;
  overflow: hidden;
}
.title-box > h3 {
  line-height: 14px;
  font-size: 0.8rem;
}
.title-box > p {
  line-height: 16px;
  font-size: 0.7rem;
  text-align: left;
  text-indent: 2em;
}
</style>