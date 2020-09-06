<template>
	<view class="box">
		<view class="title">{{data.OrderTitle}}</view>
		
		
		<view class="title1">联系人：</view>
		<view class="content">{{data.ReleaseName}}</view>
		
		<view class="title1">联系电话：</view>
		<view class="content">{{data.phone}}</view>
		<view class="title1">截止日期：</view>
		<view class="content">{{data.deadTime}}</view>
		<view class="title1">内容说明：</view>
		<view class="content">{{data.OrderContent}}</view>
		
		<view class="" v-if="isfabuperson">
			<view class="title1" style="margin-top:30px;color:red;">接单人信息：</view>
			<view class="content">姓名：{{data.acceptPerson}}</view>
			<view class="content">电话：{{data.acceptPhone}}</view>
		</view>
		 
		 
		 
		<view class="" v-if="isfabuperson">
			<!-- 待接单  -->
			<view class="bottom" v-if="isDie()">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right" style="background-color: #ccc;" >待接单</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="data.Status==3">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1" style="background-color: rgb(0, 121, 254);" @click="yanshou">待验收</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="data.Status==4">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1">已验收</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="isDie1()">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1">已过期</view>
			</view>
		</view>
		
		
		<view class="" v-else>
			<!-- 待接单  -->
			<view class="bottom" v-if="isDie()">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right" @click="accept">待接单</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="data.Status==3">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1">已接单</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="data.Status==4">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1">已验收</view>
			</view>
			<!-- 已接单 -->
			<view class="bottom" v-if="isDie1()">
				<view class="left">
					<view class="up">任务奖励</view>
					<view class="down">{{data.OrderAmount}}</view>
				</view>
				<view class="right1">已过期</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{},
				id:1,
				acceptPerson:"",
				acceptPhone:"",
				isfabuperson:false,
				isjiedanperson:false
				
			}
		},
		
		onLoad(options) {
			console.log(options)
			this.id = options.id
		},
		onShow() {
			this.getAllData()
		},
		methods: {
			
			// 待接单
			isDie(){
				var item = this.data
				console.log(11111,item);
				var timeNow = Date.now();
				var timeDie = Date.parse(item.deadTime);
				if(item.Status==2 && timeNow<timeDie){
					return true;
				}else {
					return false;
				}
			},
			// 已过期
			isDie1(){
				var item = this.data
				console.log(11111,item);
				var timeNow = Date.now();
				var timeDie = Date.parse(item.deadTime);
				if(item.Status==2 && timeNow>timeDie){
					return true;
				}else{
					return false;
				}
			},
			accept(){
					this.username = uni.getStorageSync('username');
					this.password = uni.getStorageSync('password');
					if(this.username&&this.password){
						uni.navigateTo({
							url:"./accept?id="+this.id
						})
					}else{
						uni.showModal({
						    title: '提示',
						    content: '发布任务需要登陆，是否立即去登陆',
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
									// uni.switchTab({
									//     url: '../tabbar-1/login'
									// });
									uni.navigateTo({
										url: '../tabbar-1/login'
									});
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
			},
			judgeFaburen(){
				var loginName = uni.getStorageSync('username');
				var faburen = this.data.username;
				if(loginName==faburen){
					this.isfabuperson = true;
				}else{
					this.isfabuperson = false;
				}
				if(loginName == this.data.acceptPerson){
					this.isjiedanperson = true;
				}else{
					this.isjiedanperson = false;
				}
			},
			// 发布人验收
			yanshou(){
				var me = this;
					uni.showLoading({
					    title: '加载中...',
						mask:true
					});
				
					uni.request({
						url: "http://139.155.90.219:3000/acceptHelp"+ `?id=${this.id}&acceptPerson=${this.acceptPerson}&acceptPhone=${this.acceptPhone}&Status=4`,
						data: {},
						header: {},
						success(response) {
							me.getAllData()
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
			// 查询所有数据
			getAllData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
			
				uni.request({
					url: "http://139.155.90.219:3000/getHelps_new_one"+ `?id=${this.id}`,
					data: {},
					header: {},
					success(response) {
						console.log(response.data)
						me.data=response.data[0];
						me.judgeFaburen()
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
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.box{
		padding:0 20px;
		text-indent: 2em;
		height: 100%;
	}
	.title{
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color:red;
	}
	.title1{
		font-size: 18px;
		text-indent: 0em;
		font-weight: bold;
	}
	.content{
		font-size: 18px;
	}
	.bottom{
		width: 100%;
		height: 60px;
		background-color: #f2f2f2;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		text-align: center;
	}
	.left{
		flex:1;
	}
	.up{
		height: 20px;
		line-height: 24px;
	}
	.down{
		height: 40px;
		line-height: 40px;
		color:red;
		font-size: 26px;
	}
	.right{
		flex:1;
		background-color:rgb(0, 121, 254);
		color:#fff;
		font-size: 30px;
		text-align: center;
		line-height: 60px;
		padding: 0;
	}
	.right1{
		flex:1;
		background-color:#ccc;
		color:#fff;
		font-size: 30px;
		text-align: center;
		line-height: 60px;
		padding: 0;
	}
</style>
