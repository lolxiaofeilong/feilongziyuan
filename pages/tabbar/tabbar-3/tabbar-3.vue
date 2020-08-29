<template>
	<view class="content">
		<view class="box" v-if="item.show==1" v-for="(item,idx) in data" :key="idx" :style="{background:item.background ,color:item.color}"
			@click="seeDetail(item.link)"
		>
			<view class="item_icon">
				<!-- <image src="../../../static/News.png" mode="widthFix"></image> -->
				<image src="../../../static/notice.svg" mode="widthFix"></image>
			</view>
			<view class="animate" :style="{'animation-duration' :item.speed+'s'}">{{item.news}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				time:10
			}
		},
		onLoad() {

		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			uni.navigateTo({
				url: './add'
			});
		},
		onShow: function() {
			var me = this;
			this.getAllData();
			uni.onNetworkStatusChange(function(res) {
				console.log(res.networkType);
				var str = ""
				if(res.networkType=="none"){
					str = "无网络连接";
				}else{
					str = res.networkType +"已连接";
					me.getAllData();
				}
				uni.showToast({
					title: str,
					duration: 2000,
					icon: "none"
				});
			});
		},
		methods: {
			 // 查询好消息
			getAllData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					 url:"http://139.155.90.219:3000/getGoodNews",
					 data:{},
					 header:{},
					 success(response) {
						console.log("bannerData",response);
						me.data = response.data
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
			seeDetail(link){
				// console.log("11111111")
				// // location.href=link //浏览器中使用的跳转例子
				// plus.runtime.openURL(link); //app中的跳转方法
				uni.navigateTo({
					url: './webView?url='+link
				});
			}
		},
		mounted() {
			// this.getAllData();
		}
	}
</script>

<style scoped>
	.content {
		
	}
	.box{
		background-color: #ccc;
		margin-bottom: 5px;
		display: flex;
		overflow: hidden;
	}
	.item_icon{
		width:30px;
		background-color: #fff;
		z-index: 10;
	}
	.item_icon image{
		width: 30px;
	}
	.animate {
		flex:1;
		padding-left: 50px;
		font-size: 12px;
		line-height: 30px;
		/* color: #000; */
		display: inline-block;
		white-space: nowrap;
		animation: 10s wordsLoop linear infinite normal;
		font-size: 20px;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(750rpx);
			-webkit-transform: translateX(750rpx);
		}
		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
</style>
