<template>
	<view>
		<view style="display: flex;flex-wrap: wrap;">
			<scroll-view scroll-y="true" style="width:50%; height: 200px;"  class="content" v-for="(item,idx) in data" :key="idx">
				<image  :src="item.img"   style="width:100%;height:100%;" @click="yulanImg(idx)" 	lazy-load></image>
			</scroll-view>
		</view>
		 <view class="loading">{{loadingTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					
				],
				limit:10,
				page:1,
				loadingTxt:'加载更多',
			}
		},
		onHide() {
			this.page=1;
			this.data=[];
		},
		onShow: function() {
			console.log("返回的时候会刷新吗")
			// 返回的时候也要刷新，所以写在这里
			this.getNews();
		},
		onReachBottom() {
			// 阻止重复加载
			if(this.timer !== null){
				clearTimeout(this.timer)
			}
			this.timer=setTimeout(()=>this.getNews(),500)
		},
		onLoad(options) {
			this.city = options.city;
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			uni.navigateTo({
				url: "./addNews?city="+this.city
			});
		},
		methods: {
			getNews(){
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				var me = this;
				uni.request({
					// url: "http://139.155.90.219:3000/getNews",
					url: "http://139.155.90.219:3000/getNews" + `?page=${this.page}&limit=${this.limit}&city=${this.city}`,
					data: {},
					header: {},
					success(response) {
						if(response.data.length ==0){
							me.loadingTxt="已经加载全部"
							return
						}
						me.data = me.data.concat(response.data);
						me.page++;
						console.log(me.data)
					},
					fail: (e) => {
						uni.showToast({
							title: '服务器异常，请稍后重试',
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
			yulanImg(idx){
				var imgdata = this.data;
				var imgArr =[];
				for(var i=0;i<imgdata.length;i++){
					imgArr.push(imgdata[i].img)
				}
				console.log(idx,imgArr)
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[idx]
				});
			}
		},
		
		mounted() {
		}
	}
</script>

<style scoped>
	.loading{
	       line-height: 2em;
	       text-align: center;
	       color: #888;
	       margin-top: 30rpx;
	   }
</style>
