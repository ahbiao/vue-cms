<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell
          center
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          title-class="van-ellipsis"
          label-class="labbel"
          :to="'/home/newslist/'+item.id"
        >
          <template #icon>
            <van-icon :name="item.img_url" size="50" tag="div" />
          </template>
          <template #label>
            <span>发表时间：{{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>访问：{{item.click}}</span>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    async getNewsList() {
      const { data } = await this.$http.get("/api/getnewslist");
      if (data.status === 0) return (this.list = data.message);
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }

      this.getNewsList();
      // console.log(this.getNewsList())
      this.loading = false;
      if (this.list.length >= 9) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  filters: {}
};
</script>

<style scoped>
.van-icon {
  margin-right: 16px;
}
.labbel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
