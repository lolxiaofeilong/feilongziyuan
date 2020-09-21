<template>
	<view>
		<view class="table" style="color:red;">
			<view class="left">账号</view>
			<view class="center">用户名</view>
			<view class="right">密码</view>
		</view>
		<view class="table" v-for="(item,index) in user" :key="index">
			<view class="left">{{item.account}}</view>
			<view class="center">{{item.nickName}}</view>
			<view class="right">{{item.password}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:[]
			}
		},
		methods: {
			getUser() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
			
				uni.request({
					url: "http://139.155.90.219:3000/getUser",
					data: {},
					header: {},
					success(response) {
						me.user = response.data;
					},
					fail: (e) => {
						uni.showToast({
						    title: '服务器异常，请稍后重试',
						    duration: 2000,
							icon:"none"
						});
				
						setTimeout(() => {
							uni.hideLoading();
						}, 300);
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
		},
		mounted(){
			this.getUser()
		}
	}
</script>

<style scoped>
	button{
		font-size: 10px;
	}
	.table{
		display: flex;
		flex-direction: row;
		height: 30px;
		border-bottom: 1px solid #eee;
		line-height: 30px;
	}
	.left{
		flex:1;
	}
	.center{
		flex:1;
	}
	.right{
		flex:1;
	}
</style>
