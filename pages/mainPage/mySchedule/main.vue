<template>
	<view>
		<view class="main">
			<view class="release_title"> 标题：</view>
			<input type="text" v-model="title" placeholder="请输入标题"/>
			<view class="release_title"> 日期：</view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="choose_date">{{date}}</view>
			</picker>
			<view class="release_title"> 备注：</view>
			<textarea v-model="content" placeholder="请输入详细内容" maxlength="-1" auto-height/>

			<!-- <van-button type="primary" @click="addData" block>发布消息</van-button> -->
			<view class="btn">
				<button type="primary" @click="addData">添加计划</button>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				title: "",
				content: "",
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
			}
		},
		
		methods: {
			 // 添加数据
			addData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				var username = uni.getStorageSync('username');
				if(username){
					uni.request({
					 url:"http://139.155.90.219:3000/addMyPlan"+`?title=${this.title}&remark=${this.content}&time=${this.date}&username=${username}`,
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
							},2000)
					 },
					 fail: (e) => {
						uni.showToast({
						    title: '网络异常...',
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
				
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
		},
		mounted() {
			
		}
	}
</script>

<style>
	.btn{
		width: 100%;
		height: 50px;
		position: absolute;
		left:0;
		bottom: 0;
	}
	.main{
	    flex:1;
	    overflow-y:scroll;
	    /* background-color: #f2f2f2; */
	    margin: 0;
	    padding:0 10px;
	}
	.release_title{
	    height: 50px;
	    line-height: 50px;
	}
	input{
		height: 30px;
		border-bottom:1px solid #ccc;
	}
	textarea{		
		min-height: 50px;
		border-bottom:1px solid #ccc;
		width: 100%;
	}
	.choose_date{
		height: 30px;
		line-height: 30px;
		border-bottom:1px solid #ccc;
	}
</style>
