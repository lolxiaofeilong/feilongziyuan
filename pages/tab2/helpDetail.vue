<template>
	<view>
		<view class="main">
			<view class="content" style="font-size: 30px;color:red; text-align: center;">{{data.title}}</view>
			<view class="title">发布日期： </view>
			<view class="content" style="">{{data.releaseTime}}</view>
			<view v-if='!!data.name'>
				<view class="title">联系人：</view>
				<view class="content">{{data.name}}</view>
			</view>
			<view v-if='!!data.name'>
				<view class="title">联系电话：</view>
				<view class="content" style="color:#0000FF;" @click="phoneCall(data.phone)">{{data.phone}}</view>
			</view>
			<view v-if='!!data.name'>
				<view class="title">价格：</view>
				<view class="content">{{data.price}}</view>
			</view>
			
			<view class="title">具体内容：</view>
			<view class="content">{{data.content}}</view>
			<!-- <scroll-view scroll-y="true" class="" v-for="(item ,idx) in data.img" :key="idx"> -->
				<image :src="item" style="width:24%;height: 100px;border: 1px solid #ccc;border-radius: 10px;"v-for="(item ,idx) in data.img" :key="idx" @click="yulanImg(idx)"></image> 
			<!-- </scroll-view> -->
			<view class="" >
				评论：(<text style="color:red;">{{pinglunData.length}}条 </text>)
			</view>
			<view class="pinglun" v-for="(item,idx) in pinglunData" :key="idx">
				
				<view class="pinglun_1">
					<text style="background:#ccc;">{{item.userName}}:</text> ----{{item.time}}
				</view>
				<view class="pinglun_2">
					{{item.content}}
				</view>
				<!-- <view class="pinglun_3">
					{{item.time}}
				</view> -->
			</view>
			<view class="addPingLun">
				<view class="addPingLun_left">
					<textarea v-model="pinglun" placeholder="请留下你的评论"style="padding-left:20px;padding-top:20px;" maxlength="-1" auto-height />
				</view>
				<view class="addPingLun_right" @click="checkLogin">
					评论
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				pinglun:"",
				pinglunData:[]
			}
		},
		methods: {
			// 打电话
			phoneCall(num){
				uni.makePhoneCall({
					phoneNumber: num,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			addPL(){
				var me = this;
				console.log(1111111,this.username);
				console.log(1111111,this.pinglun);
				console.log(1111111,this.data.id);
				if(!this.pinglun){
					return 
				}
				uni.request({
				 url:"http://139.155.90.219:3000/addPingLun"+`?content_id=${this.data.id}&content=${this.pinglun}&userName=${this.nickName}&time=${this.getDate()}`,
				 data:{},
				 header:{},
				 success(response) {
						uni.showToast({
						    title: '评论成功',
						    duration: 2000,
							icon:"none"
						});
						me.pinglun="";
						me.getPL();
				 },
				 fail: (e) => {
					 console.log(111)
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
			// 查询评论
			getPL() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					url: "http://139.155.90.219:3000/getpinglun"+`?content_id=${this.data.id}`,
					data: {},
					header: {},
					success(response) {
						console.log("bannerData", response);
						me.pinglunData = response.data.reverse();
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
				var imgdata = this.data.img;
				var imgArr =[];
				for(var i=0;i<imgdata.length;i++){
					imgArr.push(imgdata[i])
				}
				console.log(idx,imgArr)
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[idx]
				});
			},
			checkLogin() {
				this.username = uni.getStorageSync('username');
				this.password = uni.getStorageSync('password');
				this.nickName = uni.getStorageSync('nickName');
				if (this.username && this.password) {
					// 如果已经登录了，这里就可以评论了
					this.addPL();
				} else {
					uni.showModal({
						title: '提示',
						content: '发布任务需要登陆，是否立即去登陆',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// uni.switchTab({
								// 	url: '../tabbar/tabbar-1/login'
								// });
								uni.navigateTo({
									url: '../tabbar-1/login'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			getDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var fen = date.getMinutes();
				var miao = date.getSeconds();
				var str = year + "年" + month + "月" + day + "日 " + hour +":"+fen+":" +miao;
				return str
			},
		},
		mounted() {
			var query = uni.getStorageSync('help');
			var vars = query.split("&");
			var obj = {};
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				console.log("pair[0]", pair[0])
				obj[pair[0]] = decodeURIComponent(pair[1])
				// console.log(obj)
			}
			obj.img = JSON.parse(obj.img);
			this.data = obj;
			console.log(this.data);
			// 获取评论
			this.getPL();
		}
	}
</script>

<style>
	.main{
	    padding:0 20px;
	    margin-top:0;
		padding-bottom:100px;
	}
	.title{
	    color:blue;
	}
	.content{
	    background: #fff;
	    min-height: 20px;
	    text-indent: 2em;
	}
	.addPingLun{
		width:100%;
		min-height:50px;
		position: fixed;
		left:0;
		bottom: 0;
		background-color: #fff;
		display: flex;
		border-top :1px solid #ccc;
	}
	.addPingLun_left{
		flex:1;
	}
	.addPingLun_right{
		width: 100px;
		text-align: center;
		line-height: 50px;
		background-color: #4CD964;
		color:#fff;
	}
	.pinglun{
		min-height: 30px;
		border-bottom:1px solid #f2f2f2;
	}
	.pinglun_1{
		color: #666;
	}
	.pinglun_2{
		text-indent: 2em;
	}
	.pinglun_3{
		text-align: right;
		font-size: 6px;
	}
</style>
