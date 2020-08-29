<template>
	<view class="content" >
		<view class="main" >
			<view class="snail_list_box" v-for='(item,idx) in data' :key="idx" @click="seeDetail(item)">
				<view class="snail_list_box_one" >
					<view class="snail_list_box_one_name" style="color:red;">发布人：{{item.username}}</view>
				</view>
				<view class="snail_list_box_one" v-if="!!item.title">
					<view class="snail_list_box_one_name">{{item.title}}</view>
					<view class="snail_list_box_one_money">{{item.price}}</view>
				</view>
				<view class="snail_list_box_two">{{item.content}}</view>
				<view class="snail_list_box_three">
					<view class="snail_list_box_three_left">
						<view class="snail_list_box_three_left_up">联系人:{{item.name}} 电话：<text style="color:#0000FF;" @click="phoneCall(item.phone)">{{item.phone}}</text> </view>
						<view class="snail_list_box_three_left_down">发布日期：{{item.releaseTime}}</view>
					</view>
				</view>
				<view v-if="!!item.img" class="" style="display: flex;flex-wrap: wrap; min-height:100px;max-height:200px;overflow: hidden;margin-bottom: 10px;"  >
					<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item1 ,idx1) in item.img" :key="idx1">
						<image  style="width: 80%;height: 80%;"  :src="item1" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		 <view class="loading">{{loadingTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingTxt:'加载更多',
				data: [],
				height:0,
				timer:null,
				limit:10,
				page:1,
				relesePerson:""
			}
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			
			this.checkLogin();
		},
		onLoad() {
			console.log(111111111)
		},
		onShow: function() {
			console.log("返回的时候会刷新吗")
			// 返回的时候也要刷新，所以写在这里
			this.getAllData();
			// this.getHeight();
			var me = this;
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
		onHide() {
			this.page=1;
			this.data=[];
		},
		onReachBottom() {
			// 阻止重复加载
			if(this.timer !== null){
				clearTimeout(this.timer)
			}
			this.timer=setTimeout(()=>this.getAllData(),500)
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
			// 查询所有数据
			getAllData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					url: "http://139.155.90.219:3000/getHelps"+ `?limit=${me.limit}&page=${me.page}`,
					data: {},
					header: {},
					success(response) {
						 if(response.data.length ==0){
							me.loadingTxt="已经加载全部"
							return
						}
						for(var i=0;i<response.data.length;i++){
							if(response.data[i].img){
								response.data[i].img = JSON.parse(response.data[i].img);
							}
						}
						me.data = me.data.concat(response.data.reverse()) 
						console.log(1111111111,me.data);
						me.page++;
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
			// 原始版本
			// getAllData() {
			// 	var me = this;
			// 	uni.showLoading({
			// 	    title: '加载中...',
			// 		mask:true
			// 	});

			// 	uni.request({
			// 		url: "http://139.155.90.219:3000/getHelps",
			// 		data: {},
			// 		header: {},
			// 		success(response) {
			// 			for(var i=0;i<response.data.length;i++){
			// 				if(response.data[i].img){
			// 					response.data[i].img = JSON.parse(response.data[i].img);
			// 				}
			// 			}
			// 			me.data = response.data.reverse();
			// 			console.log(1111111111,me.data)
			// 		},
			// 		fail: (e) => {
			// 			uni.showToast({
			// 			    title: '服务器异常，请稍后重试',
			// 			    duration: 2000,
			// 				icon:"none"
			// 			});
			// 		},
			// 		complete: () => {
						
			// 			setTimeout(() => {
			// 				uni.hideLoading();
			// 			}, 300);
			// 		}
			// 	})
			// },
			seeDetail(item) {
				console.log(item);
				var str = "";
				for (var key in item) {
					if(key=="img"){
						str += key + "=" + JSON.stringify(item[key]) + "&"
					}else{
						str += key + "=" + item[key] + "&"
					}
				}
				uni.setStorageSync("help", str.slice(0, -1));
				uni.navigateTo({
					url: "../../tab2/helpDetail"
				});
			},
			checkLogin(){
				this.username = uni.getStorageSync('username');
				this.password = uni.getStorageSync('password');
				if(this.username&&this.password){
					// 已经登录了的
					// 是否有发布朋友圈的权限----新账号3天之后才能发布，----我后台可以控制取消他的发布权限
					// var registerTime = uni.getStorageSync('registerTime');
					// var date1 = Date.now();
					// var date2 = Date.parse(registerTime);
					// console.log(date1)
					// console.log(date2)
					// console.log(date1-date2);
					// var shengyuTime =parseInt(209200000/1000- (date1-date2)/1000) 
					// if(date1-date2 <209200000){
					// 	uni.showModal({
					// 	    title: '提示',
					// 	    content: '您还剩 '+shengyuTime+" 秒才能发布消息",
					// 	    success: function (res) {
					// 	        if (res.confirm) {
					// 	            console.log('用户点击确定');
					// 	        } else if (res.cancel) {
					// 	            console.log('用户点击取消');
					// 	        }
					// 	    }
					// 	});
					// 	return false;
					// }else{
						// 查看是否被取消了资格
						var cancleMoments = uni.getStorageSync('cancleMoments');
						if(cancleMoments){
							uni.showModal({
							    title: '提示',
							    content: '由于你发布了不符合中国国情的消息，所以被取消了发布消息的资格',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}else{
							uni.navigateTo({
								url: "../../tab2/release"
							});
						}
						
					// }
				}else{
					uni.showModal({
					    title: '提示',
					    content: '发布任务需要登陆，是否立即去登陆',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								// uni.switchTab({
								//     url: '../tabbar-1/login'
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
			}
			// getHeight() {
			// 	// 计算屏幕剩余高度  填补剩余高度
			// 	let _this = this;
			// 	uni.getSystemInfo({
			// 		success(res) {
			// 			_this.phoneHeight = res.windowHeight;
			// 			console.log(res.windowHeight);
			// 			// 计算组件的高度
			// 				_this.height = res.windowHeight 
			// 		}
			// 	});

			// }
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.main {
		/* flex: 1; */
		overflow-y: scroll;
		background-color: #f2f2f2;
		margin: 0;
	}

	.snail_list_box {
		/* height:120px; */
		min-height: 50px;
		padding: 10px;
		background-color: #fff;
		margin: 10px;
		padding-bottom: 0;
		border-radius: 5px;

	}

	.snail_list_box_one {
		height: 23px;
		display: flex;
		margin-bottom: 10px;
		color: #666;
		font-weight: bold;
	}

	.snail_list_box_one_name {
		flex: 1;
		/* width:255px; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.snail_list_box_one_money {
		min-width: 80px;
		color: red;
		text-align: right;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.snail_list_box_two {
		min-height: 22px;
		max-height: 48px;
		font-size: 14px;
		color: #666;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 22px;
	}

	.snail_list_box_three {
		height: 40px;
		display: flex;
	}

	.snail_list_box_three_left {
		flex: 1;
		font-size: 12px;
		color: #666;
		line-height: 20px;
		height: 20px;
	}

	.snail_list_box_three_right {
		min-width: 80px;
		color: red;
		font-weight: bold;
		text-align: right;
		position: relative;
	}

	.snail_list_box_three_right_text {
		width: 78%;
		height: 80%;
		text-align: center;
		border: 1px solid red;
		border-radius: 21px;
		line-height: 24px;
		font-weight: 500;
		font-size: 16px;
		position: absolute;
		right: 0;
		top: 0;
	}

	.snail_list_box_three_right_text1 {
		width: 78%;
		height: 80%;
		text-align: center;
		/* border: 1px solid red; */
		border-radius: 21px;
		line-height: 24px;
		font-weight: 500;
		font-size: 16px;
		position: absolute;
		right: 0;
		top: 0;
	}

	.snail_list_box_three_right_text1 img {
		width: 100px;
		position: absolute;
		right: 0px;
		bottom: 0px;
	}

	.snail_list_box_three_right_text_color1 {
		color: red;
		border: 1px solid red;
	}

	.snail_list_box_three_right_text_color2 {
		color: #FF5400;
		border: 1px solid #FF5400;
	}

	.snail_list_box_three_right_text_color3 {
		color: #57CE00;
		border: 1px solid #57CE00;
	}

	.snail_list_box_three_right_text_color4 {
		color: #333;
		border: 1px solid #333;
	}
	.good{
		border-top:1px solid #ccc;
		height:30px;
		line-height: 30px;
	}
	 .loading{
	        line-height: 2em;
	        text-align: center;
	        color: #888;
	        margin-top: 30rpx;
	    }
</style>
