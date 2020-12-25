<template>
	<view>
		<!-- <button type="default" @click="goMainPage">去主页</button> -->
		<view class="ad" >
			<image src="http://139.155.90.219:1000/lanch.png" mode="widthFix"></image>
			<view class="tiaoguo" @click="goMainPage">跳过</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goMainPage(){
				console.log(111111111111)
				uni.switchTab({
				    url: './tabbar/tabbar-1/tabbar-1'
				});
			}
		}
	}
</script>

<style scoped>
	page{
		width: 100%;
		height: 100%;
		/* background-color: red; */
	}
	.ad{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.ad image{
		width: 100%;
		height: 100%;
	}
	.tiaoguo{
		width: 40px;
		height: 40px;
		background-color: #999;
		position: absolute;
		right: 10px;
		top:20px;
		text-align: center;
		line-height: 40px;
		border-radius: 50%;
		color: #fff;
	}
</style>
