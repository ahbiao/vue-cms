<template>
  <div>
    <van-panel title="发表评论">
      <van-field
        v-model="message"
        rows="2"
        autosize
        clearable
        size="large"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言内容"
        show-word-limit
      ></van-field>
      <template #footer>
        <van-button block type="primary" color="#26A2FF" @click="postMsg">提交</van-button>
      </template>
    </van-panel>

    <van-panel title="评论内容">
      <van-cell-group>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了 " @load="onLoad">
          <van-cell
            v-for="(item, index) in cmtlist"
            :key="index"
            :title="item.content"
            label-class="label"
          >
            <template #label>
              <span>{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}</span>
              <span>时间：{{item.add_time | dateFormat}}</span>
            </template>
          </van-cell>
        </van-list>
      </van-cell-group>
    </van-panel>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      page: 1, //评论页数
      message: "", //即将发表的评论
      cmtlist: [], //评论数组
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  created() {
    this.getCommentByPage();
  },
  props: ["newsid"],
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.cmtlist = [];
        this.refreshing = false;
      }

      this.loadMore();
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
    async getCommentByPage() {
      //获取评论
      const { data } = await this.$http.get(
        "/api/getcomments/" + this.newsid + "?pageindex=" + this.page
      );
      if (data.status === 0)
        return (this.cmtlist = this.cmtlist.concat(data.message)); //拼接数组
      // 数据全部加载完成
      if (data.message.length <= 0) {
        this.finished = true;
      }
    },
    loadMore() {
      //获取更多评论
      this.page++;
      this.getCommentByPage();
    },
    async postMsg() {
      if (this.message.trim().length <= 0)
        return Toast({ message: "请输入评论内容", duration: 1000 });
      const { data } = await this.$http.post(
        "/api/postcomment/" + this.newsid,
        {
          content: this.message.trim()
        }
      );
      if (data.status === 0) {
        //   console.log(data);
        //   this.cmtlist=[]
        //   this.getCommentByPage()
        this.cmtlist.unshift({
          add_time: new Date(),
          user_name: "匿名用户",
          content: this.message.trim()
        });
        this.message = "";
      }
    }
  }
};
</script>

<style scoped>
.label {
  display: flex;
  justify-content: space-between;
}
</style>