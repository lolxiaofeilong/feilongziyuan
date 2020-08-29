<template>
	<view>
		<view class="list" v-for="(item,idx) in list" :key="idx" @click="openwin(item.url)">{{item.title2}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				list:[]
			}
		},
		onLoad(option) {
			console.log(option)
			this.title=option.title
		},
		onShow() {
			var me = this;
			uni.onNetworkStatusChange(function(res) {
				console.log(res.networkType);
				var str = ""
				if(res.networkType=="none"){
					str = "无网络连接";
				}else{
					str = res.networkType +"已连接";
					me.getDataByTitle(this.title)
				}
				uni.showToast({
					title: str,
					duration: 2000,
					icon: "none"
				});
			});
		},
		methods: {
			// 根据title查询俊哥的数据
			getDataByTitle(title) {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					url: "http://139.155.90.219:3000/getcaojun/" + title,
					data: {},
					header: {},
					success(response) {
						console.log("bannerData", response);
						me.list= response.data;
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
			openwin(url){
				// uni.navigateTo({
				//     url: 'detail?url='+url
				// });
				// uni.navigateTo({
				//     url: url
				// });
				// location.href=url
				// plus.runtime.openURL(url)
				// app内部打开网页
				uni.navigateTo({
					url: '../../tabbar/tabbar-3/webView?url='+url
				});
			}
		},
		mounted() {
			this.getDataByTitle(this.title)
		}
	}
</script>

<style>
	.list{
		height:30px;
		line-height: 30px;
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
</style>
