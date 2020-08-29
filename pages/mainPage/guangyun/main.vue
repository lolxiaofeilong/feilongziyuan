<template>
	<view>
		<view class="main">
			<view class="main_item" v-for="(item,idx) in data" :key="idx" @click="seeDetail(item.url)">
				<view class="main_item_img">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="main_item_txt">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
						name: "有的模板",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg",
						url:"one"
					},
					{
						name: "有的模板1",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg",
						url:"two"
					},
					{
						name: "添加旋转1",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg",
						url:"three"
					},
					{
						name: "添加旋转2",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg",
						url:"four"
					},
					{
						name: "青铜王者",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg",
						url:"five"
					},
				],
			}
		},
		methods: {
			seeDetail(url){
				uni.navigateTo({
					url:url
				});
			}
		}
	}
</script>

<style>
	.main{
		min-height:150rpx;
		/* background-color: red; */
		overflow-y:scroll;
		display: flex;
		flex-wrap: wrap;
		margin:20rpx 0;
	}
	.main_item{
		width:20%;
		height: 150rpx;
		text-align: center;
	}
	.main_item_img{
		/* width:100%; */
		/* height: 70%; */
	}
	.main_item_txt{
	}
	.main_item_img image{
		width:100rpx;
		height:100rpx;
		border-radius: 50%;
	}
</style>
