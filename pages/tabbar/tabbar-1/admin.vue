<template>
	<view>
		<view v-for="(item,index) in user" :key="index">
			<button type="default">{{item.account}}-{{item.nickName}}-{{item.password}}</button>
			
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
</style>
