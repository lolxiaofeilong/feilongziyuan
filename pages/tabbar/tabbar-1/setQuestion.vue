<template>
	<view>
		<view class="" style="color:red;text-align: center;line-height: 80px;background-color: #ccc;">
			设置密保，方便后面找回密码
		</view>
		<input type="text" v-model="question" placeholder="请输入问题:例如:您的手机号码" />
		<input type="text" v-model="answer" placeholder="请填写答案" />
		<button type="primary" @click="addQuestion">确定</button>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log("options.username",options.username);
		},
		data() {
			return {
				question:"",
				answer:""
			}
		},
		methods: {
			addQuestion(){
				var me = this;
				if(!this.question){
					uni.showToast({
					    title: '请输入密保问题',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				if(!this.answer){
					uni.showToast({
					    title: '请输入密保答案',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				
				uni.request({
					url: "http://139.155.90.219:3000/setquestion"+ `?username=${this.options.username}&question=${this.question}&answer=${this.answer}`,
					data: {},
					header: {},
					success(response) {
						uni.showToast({
						    title: '设置成功',
						    duration: 2000,
							icon:"none"
						});
						me.question="";
						me.answer="";
						setTimeout(() => {
							uni.switchTab({
								url:"tabbar-1"
							})
						}, 1000);
						
					},
					fail: (e) => {
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
			}
		}
	}
</script>

<style>
	input {
		height: 50px;
		border-bottom: 1px solid #f2f2f2;
	}
</style>
