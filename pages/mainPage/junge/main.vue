<template>
	<view>
		<view class="main">
			<view class="main_item" v-for="(item,idx) in data" :key="idx" @click="seeDetail(item.name)">
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
						name: "英雄联盟",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "云顶之奕",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "王者荣耀",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "绝地求生",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "和平精英",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "其他游戏",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "体育",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "音乐",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "搞笑",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "影视",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					},
					{
						name: "美食",
						src: "http://139.155.90.219/app/imgs/banner/5.jpg"
					}
				],
			}
		},
		methods: {
			seeDetail(title){
				uni.navigateTo({
					url: "detailList?title="+ title
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
