<template>
	<view class="bigBox">
		<view class="xxx">
			<view class="banner">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-if="item.show==1" v-for="(item, index) in SwiperImg" :key="index">
						<view class="swiper-item uni-bg-red">
							<image class="tupian" :src="item.img" @click="gotolink(item.link)"></image>
						</view> 
					</swiper-item>
				</swiper>
			</view>
			<view class="main">
				<view class="main_item" v-for="(item,idx) in ziyuanData" :key="idx" @click="seeDetail(item.page)" v-if="showAdmin(item)">
					<view class="main_item_img">
						<image :src="item.src" mode=""></image>
					</view>
					<view class="main_item_txt">{{item.name}}</view>
				</view>
				
				<view  v-if="showAdd" class="main_item" v-for="(item,idx) in addResource" :key="idx" @click="seeDetail(item.page)">
					<view class="main_item_img">
						<image :src="item.src" mode=""></image>
					</view>
					<view class="main_item_txt">{{item.name}}</view>
				</view>
			</view>
			<view class="addSchedule">
				<!-- <view class="addSchedule_left">我的计划</view> -->
				<view class="addSchedule_left"></view>
				<view class="addSchedule_right" @click="addSchedule">添加</view>
			</view>
		</view>

		<view class="schedule" :style="{height:height+'px'}">
			<view class="schedule_item" v-for="(item,idx) in data" :key="idx">
				<view class="schedule_item_left">
					<view class="schedule_item_left_1">{{item.title}}</view>
					<view class="schedule_item_left_2">{{item.time}}</view>
				</view>
				<view class="schedule_item_right">备注：{{item.remark}}</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showAdd:false,
				// ip: returnCitySN["cip"] + ',' + returnCitySN["cname"],
				location: "",
				// userAgent: navigator.userAgent,
				userAgent: '',
				time: this.getDate(),
				whoUse:null,
				SwiperImg: [{
					img: "",
					link: ""
				}],
				background: ['#000', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				height: 200,
				data: [],
				addResource:[
					// {
					// 	name: "资源录入",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/addResource/add"
					// },
				],
				screenWidth:300,
				ziyuanData: [
					// {
					// 	name: "全县资源",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/allCounty/main"
					// },
					// {
					// 	name: "俊哥资源",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/junge/main"
					// },
					// {
					// 	name: "广云找不同",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/guangyun/main"
					// },
					// {
					// 	name: "老铁需求",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "./wangyou"
					// },
					// {
					// 	name: "正在开发",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/beautifyPlace/main"
					// },
					// {
					// 	name: "正在开发",
					// 	src: "../../../static/icon/1.jpg",
					// 	page: "../../mainPage/car/main"
					// },
				]
			}
		},
		/**
		 * 当 searchInput 配置 disabled 为 true 时触发
		 */
		onNavigationBarSearchInputClicked(e) {
			console.log('事件执行了')
			// uni.navigateTo({
			// 	url: '/pages/template/nav-search-input/detail/detail'
			// });
		},
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap() {
			console.log("去个人中心")
			uni.navigateTo({
				url: './login'
			});
		},
		onReady() {
					uni.getSystemInfo({
						success: function (res) {
							console.log("获取设备数据",res);
							this.screenWidth = res.screenWidth;
						}
					})
				},
		onShow() {
			var me = this;
			// 查询我的计划
			this.getMyPlan();
			// 检测网络是否连接
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res.networkType);
					if(res.networkType=="none"){
						setTimeout(()=>{
							uni.showToast({
								title: "无网络连接", 
								duration: 2000, 
								icon:"none"
							});
						},3000)
					}
					
			    }
			});
			uni.onNetworkStatusChange(function(res) {
				console.log(res.networkType);
				var str = ""
				if(res.networkType=="none"){
					str = "无网络连接";
				}else{
					str = res.networkType +"已连接";
					me.getBannerData(); 
					me.addrecord();
					me.getMyPlan();
				}
				uni.showToast({
					title: str,
					duration: 2000,
					icon: "none"
				});
			});
			setTimeout(() => {
				uni.hideLoading();
			}, 3000);
			// 获取所有模块
			this.getModule();
			// 获取剩余高度
			this.getHeight();
		},
		methods: {
			// 获取banner
			getBannerData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					url: "http://139.155.90.219:3000/getBanner",
					data: {},
					header: {},
					success(response) {
						console.log("bannerData", response);
						var str = JSON.stringify(response.data)
						var data1 = JSON.parse(str);
						var arr = [];
						// 找到过期的banner
						for(var i=0;i<data1.length;i++){
							var time1 = Date.now();
							var time2 = Date.parse(data1[i].deadTime)
							console.log();
							if(time1-time2>0){
								arr.push(i);
							}
						}
						// 删除掉过期的banner
						for(var j=arr.length;j>0;j--){
							data1.splice(j,1);
							console.log(data1)
						}
						me.SwiperImg = data1
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
			// 获取所有模块
			getModule() {
				var me = this;
				
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					url: "http://139.155.90.219:3000/getModule",
					data: {},
					header: {},
					success(response) {
						console.log("bannerData", response);
						me.ziyuanData = response.data;
						// // 判断是否为管理员，如果不是就将里面是管理员才显示的去掉
						// me.whoUse = uni.getStorageSync('whoUse');
						// if(me.whoUse !="admin"){
						// 	var name = ";"
						// 	for(var i=0;i<me.ziyuanData.length;i++){
						// 		if(me.ziyuanData[i].whoUse=="admin"){
						// 			me.ziyuanData.splice(i,1)
						// 		}
						// 	}
						// }
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
			seeDetail(page) {
				console.log(1111111111)
				if(page.indexOf("http")!=-1){
					// 打开网页
					uni.navigateTo({
						url: '../tabbar-3/webView?url='+page
					});
				}else{
					// 跳转模块
					uni.navigateTo({
						url: page
					});
				}
			},
			addSchedule() {
				this.checkLogin()

			},
			getHeight() {
				// 计算屏幕剩余高度  填补剩余高度
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						console.log("剩余高度",res.windowHeight);
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.xxx');
						view.boundingClientRect(data => {
							_this.height = _this.phoneHeight - data.height;
							console.log("剩余高度",res.windowHeight,data.height);
						}).exec();
					}
				});

			},
			// 查询我的计划
			getMyPlan() {
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				var me = this;
				var username = uni.getStorageSync('username');
				if (username) {
					uni.request({
						url: "http://139.155.90.219:3000/checkMyPlan" + `?username=${username}`,
						data: {},
						header: {},
						success(response) {
							me.data = response.data.reverse();
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
				}
			},
			checkLogin() {
				this.username = uni.getStorageSync('username');
				this.password = uni.getStorageSync('password');
				if (this.username && this.password) {
					uni.navigateTo({
						url: "../../mainPage/mySchedule/main"
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '发布任务需要登陆，是否立即去登陆',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// uni.switchTab({
								// 	url: '../tabbar-1/login'
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
				var str = year + "年" + month + "月" + day + "日 " + hour + ":" + fen + ":" + miao;
				return str
			},
			getLocation() {
				var me = this;
				uni.getLocation({
					//默认wgs84返回gps坐标
					//gcj02返回国测局坐标,可以用于uni.openLocation的坐标
					type: 'wgs84',
					//解析地址
					geocode: true, //中文
					success: (data) => {
						// debugger
						console.log(666666666666666, data)
						console.log(data.address)
						if (data.address) {
							me.location = JSON.stringify(data.address);
						} else {
							me.location = JSON.stringify(data);
						}
						this.addrecord();
					},
					fail: (err) => {
						// debugger
						console.log(err)
						// this.$api.msg('获取位置失败!');
						this.addrecord();
					}
				});
			},
			showAdmin(item){
				// 判断是否为管理员，如果不是就将里面是管理员才显示的去掉
				this.whoUse = uni.getStorageSync('whoUse');
				if(this.whoUse !="admin"){
					if(item.whoUse=="admin"){
						return false;
					}else{
						return true;
					}
				}else{
					return true;
				}
			},
			// 记录使用日志
			addrecord() {
				var me = this;
				uni.request({
					url: "http://139.155.90.219:3000/addUserRecord" +
						// `?ip=${this.location}&userAgent=${this.userAgent}&time=${this.time}`,//ip和使用的手机
						`?ip=${uni.getStorageSync('username')}&userAgent=${this.userAgent}&time=${this.time}`,//更改为账号和使用的手机
					data: {},
					header: {},
					success(response) {
						
					},
					fail: (e) => {
 
					},
					complete: () => {
						setTimeout(() => {
						uni.hideLoading();
						}, 300);
					}
				})
			},
			gotolink(link){
				// console.log(1111111111,link);
				// // location.href=link //浏览器中使用的跳转例子
				// plus.runtime.openURL(link); //app中的跳转方法
				// uni.navigateTo({
				// 	url: '../tabbar-3/webView?url='+link
				// });
				if(link.indexOf("http")!=-1){
					// 打开网页
					uni.navigateTo({
						url: '../tabbar-3/webView?url='+link
					});
				}else{
					// 跳转模块
					uni.navigateTo({
						url: link
					});
				}
			} 
		},
		mounted() {
			// 添加资源的权限控制
			if(uni.getStorageSync('username')=="hufeilong"){
				this.showAdd = true;
			}
			// 获取剩余高度
			this.getHeight();
			// 获取轮播图
			this.getBannerData();
			// 获取地理位置
			// this.getLocation()
			// 获取用户手机信息
			// if (plus && plus.navigator && plus.navigator.getUserAgent()) {
			// 	console.log("111111", plus.navigator.getUserAgent())
			// 	this.userAgent = plus.navigator.getUserAgent()
			// }
			this.addrecord();
			// 获取所有模块
			this.getModule();
			
			

		}
	}
</script>

<style scoped>
	.top_zhuangtai{
		height:30px;
		background-color: #fff;
	}
	.swiper {
		height: 400rpx;
	}

	.swiper-item {
		display: block;
		height: 400rpx;
		line-height: 400rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.tupian {
		width: 100%;
		height: 100%;
	}

	.bigBox {
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
	}

	.banner {
		height: 400rpx;
		margin-bottom: 10px;
	}

	.main {
		min-height: 150rpx;
		max-height: 300rpx;
		overflow-y: scroll;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx 0;
	}

	.main_item {
		width: 20%;
		height: 150rpx;
		text-align: center;
	}

	.main_item_img {
		/* width:100%; */
		/* height: 70%; */
	}

	.main_item_txt {}

	.main_item_img image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.addSchedule {
		height: 80rpx;
		background-color: #fff;
		display: flex;
		line-height: 80rpx;
		/* margin-bottom: 10px; */
		border-bottom: 1px solid #f2f2f2;
	}

	.addSchedule_left {
		flex: 1;
		text-indent: 2em;
		background: url(../../../static/main_text.png) no-repeat;
		background-size: contain;
	}

	.addSchedule_right {
		width: 50px;
		padding-right: 20px;
		text-align: right;
		color: blue;
	}

	.schedule {
		height: 434rpx;
		/* flex:1; */
		background-color: #f2f2f2;
		overflow-y: scroll;
	}

	.schedule_item {
		padding: 0 20px;
		margin-bottom: 20rpx;
		background-color: #fff;
	}

	.schedule_item_left {
		height: 50rpx;
		line-height: 50rpx;
		display: flex;
		font-size: 18px;
	}

	.schedule_item_left_1 {
		flex: 1;
	}

	.schedule_item_left_2 {
		width: 100px;
		font-size: 12px;
		text-align: right;
	}

	.schedule_item_right {
		font-size: 12px;
		color: #999;
	}
</style>
