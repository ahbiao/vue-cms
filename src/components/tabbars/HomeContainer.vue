<template>
	<div class="app-con">
		<swiper :images="lubotu" :imgname="'img'"></swiper>
		<van-grid :column-num="3" :border="false">
			<van-grid-item v-for="(item,i) in memu" :key="i" :to="item.router" default>
				<van-image :src="item.imgUrl" />
				<div class="font-size">{{item.title}}</div>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
	import img1 from "../../images/menu1.png";
	import img2 from "../../images/menu2.png";
	import img3 from "../../images/menu3.png";
	import img4 from "../../images/menu4.png";
	import img5 from "../../images/menu5.png";
	import img6 from "../../images/menu6.png";
	import swiper from '../sub-components/Swiper.vue'
	export default {
		data() {
			return {
				memu: [{
						imgUrl: img1,
						title: "新闻资讯",
						router: "/home/newslist"
					},
					{
						imgUrl: img2,
						title: "图片分享",
						router: "/home/photolist"
					},
					{
						imgUrl: img3,
						title: "商品购买",
						router: "/home/goodslist"
					},
					{
						imgUrl: img4,
						title: "留言反馈",
						router: "/home/newslist"
					},
					{
						imgUrl: img5,
						title: "视频专区",
						router: "/home/newlist"
					},
					{
						imgUrl: img6,
						title: "联系我们",
						router: "/home/newlist"
					}
				],
				lubotu: [] //轮播图数组
			};
		},
		created() {
			this.getLunbotu();
		},
		methods: {
			async getLunbotu() {
				const {
					data
				} = await this.$http.get("/api/getlunbo");
				// console.log(data);
				if (data.status === 0) this.lubotu = data.message;
			}
		},
		components:{
			swiper
		}
	};
</script>

<style scoped>
	.my-swipe,.van-swipe {
		width: 100%;
		height: 200px;
	}

	.van-image {
		width: 60px;
		height: 60px;
	}
	.font-size {
		font-size: 13px;
	}
</style>
