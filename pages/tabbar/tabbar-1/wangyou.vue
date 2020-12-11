<template>
	<view>
		<view class="main">
			<view class="main_item" v-for="(item,idx) in city" :key="idx" @click="seeDetail(item)">
				<view class="main_item_img">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="main_item_txt">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:[
					{
						name:"城区",
						src: "../../../static/icon/1.jpg",
						link:""
					},
					
				 ],
			}
		},
		methods: {
			// 获取所有模块
			getLaotieModule() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					url: "http://139.155.90.219:3000/getLaotieModule",
					data: {},
					header: {},
					success(response) {
						console.log("bannerData", response);
						me.city = response.data
					},
					fail: (e) => {
						uni.showToast({
							title: '网络异常...',
							duration: 2000,
							icon: "none"
						});
					},
					complete: () => {
						setTimeout(() => {
							uni.hideLoading();
						}, 300);
					}
				})
			},
			seeDetail(item){
				 console.log(1111111111)
				 
				 if(item.link.indexOf("http")!=-1){
				 	// 打开网页
				 	uni.navigateTo({
				 		url: '../tabbar-3/webView?url='+item.link
				 	});
				 }else{
				 	// 跳转模块
				 	uni.navigateTo({
				 		url: item.link
				 	});
				 }
				//  // 浏览器内部打开网页
				// uni.navigateTo({
				// 	url: '../tabbar-3/webView?url='+item.link
				// });
			},
		},
		mounted(){
			this.getLaotieModule()
		}
	}
</script>

<style scoped>
	.main{
		/* height:300rpx; */
		/* background-color: red; */
		overflow-y:scroll;
		display: flex;
		flex-wrap: wrap;
		margin:20rpx 0;
	}
	.main_item{
		width:20%;
		height: 200rpx;
		text-align: center;
	}
	.main_item_img{
		/* width:100%; */
		/* height: 70%; */
	}
	.main_item_txt{
	}
	.main_item_img image{
		width:100rpx;
		height:100rpx;
		border-radius: 50%;
	}
</style>
