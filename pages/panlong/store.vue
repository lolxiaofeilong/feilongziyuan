<template>
	<view class="box" :style="{height:height+'px'}">
		<view class="left">
			<view class="left_item" 
				v-for="(item,idx) in data" 
				:key="idx" 
				:style="{backgroundColor:(idx==leftActive?'#fff':'#f1f1f1'),color:(idx==leftActive?'#007aff':'#333')}"
				@click="changeActive(item,idx)"
				>
				{{item.classic}}
			</view>
			
		</view>
		<view class="right">
			<div class="right_content">
				<view class="right_item" style="position: relative;" v-for="(item,idx) in dataDetail" :key="idx" @click="seeStore(item)">
					<view class="right_item_img" >
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="right_item_txt">{{item.name}}</view>
				</view>
				
			</div>
			
			<!-- 无数据的时候就显示这个 -->
			<view v-if="dataDetail.length==0" class="noData">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 获取上个页面传递过来的参数
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				console.log(option.city); //打印出上个页面传递的参数。
				this.city="盘龙街道";
				// this.city=option.city;
		},
		data() {
			return {
				height:100,
				leftActive:0,
				data:[
					{
						city: "盘龙街道",
						classic: "美食",
						id: 14
					},
				],
				dataDetail:[
					{	
						classic:"美食",
						name:"xxxx",
						icon:"http://139.155.90.219:1000/icon/1.png",
					},
					{
						classic:"照相馆",
						name:"xxxx",
						icon:"http://139.155.90.219:1000/icon/1.png",
					},
					{
						classic:"休闲娱乐",
						name:"xxxx",
						icon:"http://139.155.90.219:1000/icon/1.png",
					},
				],
				admin:0
			}
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			uni.navigateTo({
				url: "./search?city="+this.city
			});
		},
		onShow() {
			var me = this;
			// uni.onNetworkStatusChange(function(res) {
			// 	console.log(res.networkType);
			// 	var str = ""
			// 	if(res.networkType=="none"){
			// 		str = "无网络连接";
			// 	}else{
			// 		str = res.networkType +"已连接";
			// 		me.getDataByCity(); 
			// 	}
			// 	uni.showToast({
			// 		title: str,
			// 		duration: 2000,
			// 		icon: "none"
			// 	});
			// });
			this.adminShow();
		},
		methods: {
			adminShow(){
				this.whoUse = uni.getStorageSync('whoUse');
				if(this.whoUse){
					this.admin = 1
				}else{
					this.admin = 0
				}
			},
			delStore(id){
				console.log(id);
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					 url:"http://139.155.90.219:3000/delStore" + `?id=${id}`,
					 data:{},
					 header:{},
					 success(response) {
						uni.showToast({
						    title: '删除成功',
						    duration: 2000,
							icon:"none"
						});
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
			getHeight(){
				 // 计算屏幕剩余高度  填补剩余高度
				 let _this = this;
				 uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						console.log(res.windowHeight);
						_this.height = _this.phoneHeight
					}
				 });
			},
			changeActive(item,idx){
				this.leftActive=idx;
				this.getDataDetailbByClassic(item.classic);
			},
			// 根据乡镇查询分类
			getDataByCity() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					 url:"http://139.155.90.219:3000/getClassicNew/" + this.city,
					 data:{},
					 header:{},
					 success(response) {
						me.data = response.data;
						var item =me.data[0]
						// me.getDataByCityAndClassic(item)
						me.getDataDetailbByClassic(item.classic);
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
			getDataDetailbByClassic(classic){
				console.log("每次请求接口的参数",classic);
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					 url:"http://139.155.90.219:3000/getDataDetailNew/" + classic,
					 data:{},
					 header:{},
					 success(response) {
						me.dataDetail=response.data;
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
			seeStore(item){
				uni.navigateTo({
					url: "./storeDeatil?city=盘龙街道&classic="+item.name,
				});
				console.log("111111112222222222",item);
			},
		},
		mounted() {
			this.getHeight();
			this.getDataByCity()
			
		}
	}
</script>

<style scoped>
	.box{
		display: flex;
		overflow: hidden;
	}
	.left{
		flex:1;
		overflow-y: scroll;
		background-color: #f1f1f1;
	}
	.left_item{
		width:100%;
		height:100rpx;
		text-align: center;
		line-height:100rpx;
		/* background-color: #f7f8fa; */
		/* border-bottom: 1px solid #ccc; */
	}
	.right{
		flex:3;
		/* padding-left: 10px; */
		overflow-y: scroll;
		position: relative;
		padding:20px;
		
	}
	.right_content{
		width: 100%;
		min-height: 75px;
		display: flex;
		flex-wrap: wrap;
	}
	.right_item{
		width: 80px;
		height: 150rpx;
		text-align: center;
	}
	.right_item_img image {
		width: 100rpx;
		height: 100rpx;
		/* border-radius: 50%; */
	}
	.noData{
		text-align: center;
		line-height: 200px;
		color:#000;
		font-size: 20px;
	}
</style>
