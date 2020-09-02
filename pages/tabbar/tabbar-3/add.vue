<template>
	<view>
		<view class="add_title"> 标题：</view>
		<input type="text" v-model="news" placeholder="请输入标题" />
		<view class="add_title"> 字体颜色：</view>
		<input type="text" v-model="color" placeholder="请输入标题" />
		<view class="add_title"> 背景颜色：</view>
		<input type="text" v-model="background" placeholder="请输入标题" />
		<view class="add_title"> 链接：</view>
		<textarea v-model="link" placeholder="请输入详细内容" maxlength="-1" auto-height />
		<view class="add_title"> 速度：</view>
		<input type="text" v-model="speed" placeholder="请输入标题" />
		
		<button type="primary" @click="addData">发布消息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:"恭喜恭喜",
				color:"red",
				background:"ccc",
				link:"http://139.155.90.219:1000/goodNews/html/yunzhong.html",
				speed:"5",
				show:"1"
			}
		},
		methods: {
			// 添加数据
			addData() {
				var me = this;
				var username = uni.getStorageSync('username');
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
				 url:"http://139.155.90.219:3000/addGoodNews"+`?news=${this.news}
															&color=${this.color}
															&background=${this.background}
															&link=${this.link}
															&speed=${this.speed}
															&isShow=${this.show}
															`,
				 data:{},
				 header:{},
				 success(response) {
						uni.showToast({
						    title: '发布成功',
						    duration: 2000,
							icon:"none"
						});
						setTimeout(function(){
							uni.navigateBack();
						},1000)
				 },
				 fail: (e) => {
					 console.log(111)
					uni.showToast({
						    title: '服务器异常，请稍后重试',
						    duration: 2000,
							icon:"none"
						});
				 },
				 complete: () => {
					
					setTimeout(() => {
							uni.hideLoading();
						}, 300);
				 }
				})
			},
		}
	}
</script>

<style>
	.add_title{
	    height: 50px;
	    line-height: 50px;
	}
	input,textarea{
		padding-left: 50px;
		height: 30px;
		border-bottom:1px solid #ccc;
	}
</style>
