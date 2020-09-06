<template>
	<view class="box" :style="{height:height+'px'}">
		<view class="left">
			<view class="left_item" 
				v-for="(item,idx) in data" 
				:key="idx" 
				:style="{backgroundColor:(idx==leftActive?'skyblue':'#f7f8fa'),color:(idx==leftActive?'#fff':'#333')}"
				@click="changeActive(item,idx)"
				>
				{{item.classic}}
			</view>
			
		</view>
		<view class="right">
			<view class="item" style="position: relative;" v-for="(item,idx) in dataDetail" :key="idx" @click="seeStore(item)">
			<view class="right_del" @click.stop="delStore(item.id)" v-if="admin">删除</view>
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
			<view v-if="dataDetail.length==0" class="noData">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 获取上个页面传递过来的参数
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				console.log(option.city); //打印出上个页面传递的参数。
				this.city=option.city;
		},
		data() {
			return {
				height:100,
				leftActive:0,
				data:[
					// {
					// 	city: "盘龙街道",
					// 	classic: "童装",
					// 	id: 14
					// }
				],
				dataDetail:[],
				admin:0
			}
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			uni.navigateTo({
				url: "./search"
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
				this.getDataByCityAndClassic(item)	
			},
			// 根据乡镇查询分类
			getDataByCity() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					 url:"http://139.155.90.219:3000/getClassic/" + this.city,
					 data:{},
					 header:{},
					 success(response) {
						me.data = response.data;
						var item =me.data[0]
						me.getDataByCityAndClassic(item)
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
			// 根据城市和分类查询数据
			getDataByCityAndClassic(item) {
				var me = this;
				uni.request({
					 url:"http://139.155.90.219:3000/getDataByCityAndClassic" + `?city=${this.city}&classic=${item.classic}`,
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
				console.log("11111111",item);
				// 默认打开内部模块，如果传过来了地址就跳转网页，可以专门给他们设置网页(给钱的可以单独给他写网页)
				if(item.link){
					// 打开网页
					uni.navigateTo({
						url: '../../tabbar/tabbar-3/webView?url='+item.link
					});
				}else{
					// 跳转模块
					var str ="";
					for(var key in item){
						str += key+"="+item[key]+"&"
					}
					uni.setStorageSync("message", str.slice(0, -1))
					uni.navigateTo({
						url: "storeDetail"
					});
				}
				
				
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
	}
	.left_item{
		width:100%;
		height:100rpx;
		text-align: center;
		line-height:100rpx;
		background-color: #f7f8fa;
	}
	.right{
		flex:3;
		/* padding-left: 10px; */
		overflow-y: scroll;
		background-color: #ccc;
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
