<template>
	<view>
		<view class="right">
			<view class="item" style="position: relative;" v-for="(item,idx) in dataDetail" :key="idx" v-if="item.isShow==1" @click="seeStore(item)">
			<!-- <view class="right_del" @click.stop="delStore(item.id)" v-if="admin">删除</view> -->
				<view class="item_img">
					<image :src="item.img" ></image>
				</view>
				<view class="item_txt">
					<view style="color:red;text-align: center;">{{item.placeName}}</view>
					<view>联系人：{{item.name}}</view>
					<view>电话：{{item.phone}}</view>
					<view class="address">地址：{{item.address}}</view>
				</view>
			</view>
		</view>
		<view v-if="dataDetail.length==0" class="noData">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDetail:[],
				allStore:null
			}
		},
		onLoad(option) {
			console.log(option);
			this.basicData=option;
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮",this.basicData);
			uni.navigateTo({
				url: "./addStore?city="+this.basicData.city + "&classic="+this.basicData.classic
			});
		},
		methods: {
			// 根据城市和分类查询数据
			getDataByCityAndClassic(item) {
				var me = this;
				uni.request({
					 url:"http://139.155.90.219:3000/getDataByCityAndClassic_2020" + `?city=${item.city}&classic=${item.classic}`,
					 data:{},
					 header:{},
					 success(response) {
						 
						me.dataDetail = response.data;
						console.log("shuju",response.data)
					 },
					 fail: (e) => {
						 uni.showToast({
						    title: '服务器异常，请稍后重试',
						    duration: 2000,
							icon:"none"
						});
					 },
					 complete: () => {}
				})
			},
			seeStore(item){
				console.log("111111111",item);
				uni.navigateTo({
					url: "./storeDetail?city=盘龙街道&classic="+item.classic+"&placeName="+item.placeName,
					// url: "./store?city=盘龙街道&classic="+item.name,
				});
			}
		},
		mounted(){
			var that = this;
			console.log("mounted",this.basicData)
			this.getDataByCityAndClassic(this.basicData);
			
			
			
			
			
			// 数据操作
			// uni.request({
			// 	 url:"http://139.155.90.219:3000/getAllStore_2020",
			// 	 data:{},
			// 	 header:{},
			// 	 success(response) {
					 
			// 		console.log("所有店铺",response.data);
			// 		that.allStore = response.data
			// 	 },
			// 	 fail: (e) => {
			// 		 uni.showToast({
			// 		    title: '服务器异常，请稍后重试',
			// 		    duration: 2000,
			// 			icon:"none"
			// 		});
			// 	 },
			// 	 complete: () => {}
			// })
			
			
			// http://139.155.90.219/app/store/15989187841391678.jpg,
			// http://139.155.90.219/app/store/15989190025936275.jpg,欢迎入住
			// http://139.155.90.219/app/imgs/panlong/laopanshi/0.jpg,家常菜;
			// http://139.155.90.219/app/imgs/panlong/zhouguoguo/0.jpg,各种水果;http://139.155.90.219/app/imgs/panlong/zhouguoguo/0.jpg,各种水果;
			
			
			
			
			
			
			
			
			
			
			// var xxx = 0
			// setInterval(()=>{
			// 	// console.log(this.allStore[xxx].imgs)
			// 			var me = that.allStore[xxx];
			// 			var n = me.img.indexOf("jpg")+3
			// 			var img = me.img.slice(0,n);
			// 			console.log(me.city);
			// 			console.log(img);
			// 			console.log(me.placeName);
			// 			console.log(me.name);
			// 			console.log(me.phone);
			// 			console.log(me.address);
			// 			console.log("产品展示");
			// 			uni.request({
			// 			 url:"http://139.155.90.219:3000/addStore2020_Detail"+`?city=${me.city}&img=${img}&placeName=${me.placeName}&classic=${me.classic}&name=${me.name}&phone=${me.phone}&address=${me.address}&introduce=产品展示`,
			// 			 data:{},
			// 			 header:{},
			// 			 success(response) {
			// 					uni.showToast({
			// 					    title: '发布成功',
			// 					    duration: 2000,
			// 						icon:"none"
			// 					});
			// 			 },
			// 			 fail: (e) => {
			// 				 console.log(111)
			// 										uni.showToast({
			// 					    title: '服务器异常，请稍后重试',
			// 					    duration: 2000,
			// 						icon:"none"
			// 					});
			// 			 },
			// 			 complete: () => {
			// 			 }
			// 			})
				
			// 	xxx++;
			// },1000)
			
		}
		
			
	}
</script>

<style>
	.right{
		/* padding-left: 10px; */
		overflow-y: scroll;
		background-color: #f2f2f2;
		position: relative;
	}
	.right_del{
		color:pink;
		position: absolute;
		right:0;
		top:0;
	}
	.right .item{
	    height: 180rpx;
	    /* background-color: red; */
	    margin-bottom: 10px;
	    display: flex;
	}
	.right .item .item_img{
	    flex:1;
	    /* background-color: blue; */
	}
	.right .item .item_img image{
	    width: 100%;
	    height: 100%;
	}
	.right .item .item_txt{
	    flex:3;
	    padding-left: 10px;
	    background-color: #fff;
	    overflow: hidden;
	}
	.address{
	    width:100%;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    word-break: break-all;
	}
	.noData{
		text-align: center;
		line-height: 200px;
		color:#000;
		font-size: 20px;
	}
</style>
