<template>
	<view>
		<view class="h1">
			你有其他的吗？欢迎上传
		</view>
		<view style="display: flex;flex-wrap: wrap;">
			<view class="img_box" v-for="(item,idx) in data" :key="idx">
				<scroll-view  style="width:100%; height: 200px;"  class="content" >
					<image  :src="item.img"   style="width:100%;height:100%;" @click="yulanImg(idx)" 	lazy-load></image>
				</scroll-view>
				<!-- <view class="text">
					盘龙公告栏
				</view> -->
			</view>
			
			<!-- <scroll-view  style="width:40%; height: 200px;"  class="content" v-for="(item,idx) in data" :key="idx">
				<image  :src="item.img"   style="width:100%;height:100%;" @click="yulanImg(idx)" 	lazy-load></image>
			</scroll-view> -->
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
			console.log("options",options)
			// this.city = options.city;
			this.city = "盘龙街道";
			this.class= options.class;//分类，普通公告，政府公告，水，电，气
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			uni.navigateTo({
				url: "./addNews?city="+this.city+"&class="+this.class
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
					url: "http://139.155.90.219:3000/getNews" + `?page=${this.page}&limit=${this.limit}&city=${this.city}&class=${this.class}`,
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
	   .img_box{
		   width:46%;
		   padding:0 2%;
		   margin-bottom:20px;
	   }
	   .text{
		   text-align: center;
	   }
	   .h1{
		   height: 100px;
		   font-size: 20px;
		   text-align: center;
		   line-height: 100px;
		   color: pink;
	   }
</style>
