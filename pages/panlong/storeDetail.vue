<template>
	<view class="main">
		<view class="up" v-if="data.length !=0 ">
			<view class="name">{{data[0].placeName}}</view>
			<view class="item">联系人：{{data[0].name}}</view>
			<view class="item">联系电话：{{data[0].phone}}</view>
			<view class="item">店铺地址：{{data[0].address}}</view>
		</view>
		
		<view class="title">产品展示</view>
		<view class="product">
			<view class="item1" v-for="(item,idx) in data" :key="idx">
				<scroll-view scroll-y="true" style="width:100%;" class="content" lazy-load @click="yulanImg(idx)">
				    <image  :src="item.img"></image>
					<!-- <image  :src="item.img" @click="yulanImg(idx)"  mode="widthFix"	lazy-load></image> -->
				</scroll-view>
				<view class="text">
					{{item.introduce}}
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[]
			}
		},
		onLoad(option) {
			this.option = option;
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮",this.option);
			uni.navigateTo({
				url: "./addStoreGoods?city="+this.option.city + "&classic="+this.option.classic + "&placeName="+this.option.placeName
			});
		},
		methods: {
			// 根据城市和分类查询数据
			getData(item) {
				var me = this;
				uni.request({
					 url:"http://139.155.90.219:3000/getData2020_imgDetail" + `?city=${item.city}&classic=${item.classic}&placeName=${item.placeName}`,
					 data:{},
					 header:{},
					 success(response) {
						 
						me.data = response.data;
						console.log("shuju",response.data)
					 },
					 fail: (e) => {
						 uni.showToast({
						    title: '网络异常...',
						    duration: 2000,
							icon:"none"
						});
					 },
					 complete: () => {}
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
			console.log(111111111,this.option);
			this.getData(this.option);
		}
	}
</script>

<style scoped>
	.main{
		padding:10px;
	}
	.up{
		background-color: #ccc;
		border-radius: 10px;
		overflow: hidden;
	}
	.up .name{
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 30px;
		background-color: #007aff;
		color: #fff;
	}
	.up .item{
		min-height: 30px;
		line-height: 30px;
		padding-left: 10px;
	}
	.title{
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		background-color: #007AFF;
		border-radius: 10px;
		margin-top: 10px;
		padding-left: 20px;
		color: #fff;
		text-align: center;
	}
	.product{
		/* min-height: 300px; */
		/* background-color: red; */
		border-radius: 10px;
		/* margin-top: 10px; */
		display: flex;
		flex-wrap: wrap;
		
	}
	.item1{
		width: 48%;
		margin-bottom: 10px;
		border-radius: 10px;
		padding:1%;
		height: 300px;
	}
	.item1 .text{
		color: #999;
		min-height: 40px;
		line-height: 20px;
		font-size: 12px;
		overflow: hidden;
	}
	.content{
		width: 100%;
		height: 80%;
	}
	.content image{
		width: 100%;
		height: 100%;
	}
</style>
