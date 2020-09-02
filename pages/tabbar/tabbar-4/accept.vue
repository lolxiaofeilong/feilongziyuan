<template>
	<view>
		<view class="shuoming">
			我在app中添加这么模块，是希望能够给家乡的朋友带来方便，喜欢您填写真实的个人信息，方便发布人和你联系！！
		</view>
		<view class="release_title"> 联系人姓名：</view>
		<input type="text" v-model="acceptPerson" placeholder="请输入标题" />
		<view class="release_title"> 联系电话：</view>
		<input type="text" v-model="acceptPhone" placeholder="请输入标题" />
		
		
		<view class="btn">
			<button type="primary" @click="accept1">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:1,
				acceptPerson:"123",
				acceptPhone:"123"
			}
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
		},
		methods: {
			// 接单人去接单
			accept1(){
				var me = this;
					uni.showLoading({
					    title: '加载中...',
						mask:true
					});
				
					uni.request({
						url: "http://139.155.90.219:3000/acceptHelp"+ `?id=${this.id}&acceptPerson=${this.acceptPerson}&acceptPhone=${this.acceptPhone}&Status=3`,
						data: {},
						header: {},
						success(response) {
							uni.showToast({
							    title: '接单成功',
							    duration: 2000,
								icon:"none"
							});
							setTimeout(function(){
								uni.navigateBack();
							},500)
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
			},
		}
	}
</script>

<style>
	.shuoming{
		padding:20px;
		color: red;
	}
	.release_title{
	    height: 50px;
	    line-height: 50px;
		font-size: 20px;
	}
	input{
		height: 30px;
		border-bottom:1px solid #ccc;
		padding-left: 30px;
	}
	.btn{
		padding-top: 50px;
	}
		
</style>
