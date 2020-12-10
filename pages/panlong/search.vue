<template>
	<view>
		<view class="right">
			<view class="item" style="position: relative;" v-for="(item,idx) in dataDetail" v-if="judgeCity(item)" :key="idx" @click="seeStore(item)">
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
		data() {
			return {
				dataDetail:[],
				admin:0
			}
		},
		onLoad(options) {
			this.city = options.city
		},
		onNavigationBarSearchInputChanged(e) {
			let text = e.text;
			console.log("text",text);
			if(text){
				this.getData(text);
			}else{
				this.dataDetail.length=0;
			}
		},
		methods: {
			judgeCity(item){
				if(item.isShow==1){
					// 如果传入了城市的话就搜索当前城市的数据，否者就搜索全县的数据
					if(this.city){
						if(item.city==this.city){
							return true;
						}else{
							return false;
						}
					}else{
						return true;
					}
					
				}else{
					return false;
				}
			},
			seeStore(item){
				console.log("111111111",item);
				uni.navigateTo({
					url: "./storeDetail?city=盘龙街道&classic="+item.classic+"&placeName="+item.placeName,
					// url: "./store?city=盘龙街道&classic="+item.name,
				});
			},
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
			// 根据用户搜索查询数据
			getData(text){
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					 url:"http://139.155.90.219:3000/searchNew" + `?text=${text}`,
					 data:{},
					 header:{},
					 success(response) {
						me.dataDetail = response.data;
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
			}
		},
		mounted() {
			this.adminShow();
		}
	}
</script>

<style scoped>
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
		background-color: #fff;
	}
</style>
