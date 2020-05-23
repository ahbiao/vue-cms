<template>
  <div>
    <van-cell-group title="商品">
      <van-checkbox-group v-model="checked" @change="changeSelected">
        <van-cell center v-for="item in goodslist" :key="item.id" style="background-color:#FAFAFA">
          <template #icon>
            <van-checkbox :name="item.id"></van-checkbox>
          </template>
          <template #title>
            <van-card :price="item.sell_price" :title="item.title" :thumb="item.thumb_path">
              <template #num>
                <van-stepper
                  :default-value="countObj[item.id]"
                  :name="item.id"
                  input-width="20px"
                  button-size="18px"
                  @change="countChanged"
                />
              </template>
            </van-card>
          </template>
          <template #right-icon>
            <van-icon name="cross" color="red" size="20" title="删除" @click="del(item.id)" />
          </template>
        </van-cell>
      </van-checkbox-group>
    </van-cell-group>
    <van-cell-group title="操作">
      <van-cell center>
        <template #title>
          已选中：
          <span style="color:red">{{selectedCount}} </span>件商品
          <br />共计：
          <span style="color:red">￥{{amount}}</span>
        </template>
        <template #default>
          <van-button round type="info">去结算</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      goodslist: [],
      checked: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    ...mapMutations(["updateGoodsCount", "delFormCart","changeSelectState"]),
    async getGoodsList() {
      if (this.idstr.length <= 0) return;
      const { data } = await this.$http.get(
        "/api/goods/getshopcarlist/" + this.idstr
      );
      if (data.status === 0) {
        this.goodslist = data.message;
        this.checked = this.selectedObj;
      }
    },
    countChanged(value, detail) {
      this.updateGoodsCount({ id: detail.name, count: value });
    },
    del(id) {
      this.goodslist.some((item, i) => {
        if (item.id == id) {
          this.goodslist.splice(i, 1);
          return true;
        }
      });
      this.delFormCart(id);
    },
    changeSelected(names) {
      console.log(names);
      this.changeSelectState(names)
    }
  },
  computed: {
    ...mapGetters(["idstr", "countObj", "selectedObj",'selectedCount',"amount"])
  }
};
</script>

<style scoped>
</style>