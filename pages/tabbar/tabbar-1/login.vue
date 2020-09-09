<template>
	<view class="content">
		<!-- <view class="tab50827" v-if="showWho==1"> -->
		<view class="tab50827" >
			<view class="tab50827_login" @click="goLogin">
				<view class="tab50827_login_left">
					<uni-icons type="contact" size="80" color="#f2f2f2"></uni-icons>
				</view>
				<view class="tab50827_login_right" v-if="isLogin==false">
					<view class="tab50827_login_right_up">
						未登录
					</view>
					<view class="tab50827_login_right_down">
						登陆后内容更精彩...
					</view>
				</view>
				<view class="tab50827_login_right" v-if="isLogin">
					<view class="tab50827_login_right_up">
						{{nickName}}
					</view>
					<view class="tab50827_login_right_down">
						账号：{{username}}
					</view>
				</view>
			</view>
			<view class="tab50827_box">
				<view class="tab50827_box_left">
					<view class="">0</view>
					<view class="">关注</view>
				</view>
				<view class="tab50827_box_center">
					<view class="">0</view>
					<view class="">发布</view>
				</view>
				<view class="tab50827_box_right">
					<view class="">0</view>
					<view class="">收藏</view>
				</view>
			</view>
			<view class="tab50827_list">
				<view class="tab50827_list_item">
					<view class="tab50827_list_item_left">
						<uni-icons type="star" size="20"></uni-icons>
					</view>
					<view class="tab50827_list_item_center">
						我的收藏
					</view>
					<view class="tab50827_list_item_right">
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
				<view class="tab50827_list_item">
					<view class="tab50827_list_item_left">
						<uni-icons type="eye" size="20"></uni-icons>
					</view>
					<view class="tab50827_list_item_center">
						我的关注
					</view>
					<view class="tab50827_list_item_right">
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
				<view class="tab50827_list_item">
					<view class="tab50827_list_item_left">
						<uni-icons type="heart" size="20"></uni-icons>
					</view>
					<view class="tab50827_list_item_center">
						我的作品
					</view>
					<view class="tab50827_list_item_right">
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
				<view class="tab50827_list_item">
					<view class="tab50827_list_item_left">
						<uni-icons type="upload" size="20"></uni-icons>
					</view>
					<view class="tab50827_list_item_center">
						发布
					</view>
					<view class="tab50827_list_item_right">
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
				<view class="tab50827_list_item">
					<view class="tab50827_list_item_left">
						<uni-icons type="gear" size="20"></uni-icons>
					</view>
					<view class="tab50827_list_item_center">
						设置
					</view>
					<view class="tab50827_list_item_right">
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
				<button class="login_out" type="primary" @click="loginOut" v-if="isLogin">退出登陆</button>
			</view>
		</view>
		<view v-if="showWho==2" class="logn_box">
			<view class="content1">
				<input type="text" v-model="nickName" placeholder="昵称" />
				<input type="text" v-model="reg_name" placeholder="账号" />
				<input type="text" v-model="reg_pass" placeholder="密码" />
				<view class="havename" @click="goLogin">
					<uni-icons type="arrowthinright"></uni-icons>已有账号
				</view>
				<button type="primary" @click="checkAccount">注册</button>
			</view>
		</view>
		<view v-if="showWho==3" class="logn_box">
			<view class="content1">
				<input type="text" v-model="reg_name" placeholder="账号" />
				<input type="text" v-model="reg_pass" placeholder="密码" />
				<view class="havename" @click="goRegister">
					<uni-icons type="arrowthinright" ></uni-icons>立即注册
				</view>
				<view class="havename" @click="goLookFor">
					<uni-icons type="arrowthinright" ></uni-icons>忘记密码
				</view>
				<button type="primary" @click="login">登陆</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabChange: 0,
				reg_name: "",
				reg_pass: "",
				isLogin:false,
				username:"",
				password:"",
				nickName:"",
				registerTime:"",//注册时间
				cancleMoments:"",
				showWho:1, //1,个人中心，2显示注册，3显示登陆
			}
		},
		onLoad() {

		},
		methods: {
			// 找回密码
			goLookFor(){
				uni.navigateTo({
					url:"./forget"
				})
			},
			goLogin:function(){
				console.log("去登陆")
				if(!this.isLogin){
					this.showWho=3;
				}
			},
			goRegister:function(){
				console.log("去注册")
				this.showWho=2;
			},
			changeTab: function(value) {
				console.log(value);
				this.tabChange = value;
			},
			// 用户名是否存在
			checkAccount() {
				if(!this.nickName|| this.nickName>16){
					uni.showToast({
					    title: '请输入昵称,最多16位',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				if(this.reg_name.length<6 || this.reg_name.length>16){
					uni.showToast({
					    title: '账号为6-16位',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				if(this.reg_pass.length<6 || this.reg_pass.length>16){
					uni.showToast({
					    title: '密码为6-16位',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					url: "http://139.155.90.219:3000/checkAccount"+`?account=${this.reg_name}`,
					data: {},
					header: {},
					success(response) {
						if (response.data.length > 0) {
							uni.showToast({
							    title: '用户名已存在',
							    duration: 2000,
								icon:"none"
							});
						} else {
							me.register();
						}
					},
					fail: (e) => {
						uni.showToast({
						    title: '服务器异常，请稍后重试',
						    duration: 2000,
							icon:"none"
						});
	
						setTimeout(() => {
							uni.hideLoading();
						}, 300);
					},
					complete: () => {}
				})
			},
			getDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var fen = date.getMinutes();
				var miao = date.getSeconds();
				var str = year + "/" + month + "/" + day + " " + hour +":"+fen+":" +miao;
				return str
			},
			// 注册
			register() {
				var me = this;
				var time = this.getDate()
				uni.request({
					url: "http://139.155.90.219:3000/register"+`?account=${this.reg_name}&password=${this.reg_pass}&nickName=${this.nickName}&time=${time}`,
					data: {},
					header: {},
					success(response) {
							uni.showToast({
							    title: '注册成功',
							    duration: 2000,
								icon:"none"
							});
							me.tabChange=1
					},
					fail: (e) => {
						uni.showToast({
						    title: '注册失败，请稍后重试',
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
			// 登陆
			login() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					url: "http://139.155.90.219:3000/login"+ `?account=${this.reg_name}&password=${this.reg_pass}`,
					data: {},
					header: {},
					success(response) {
						if (response.data.length > 0) {
							uni.showToast({
							    title: '登陆成功',
							    duration: 2000,
								icon:"none"
							});
							uni.setStorageSync("username", me.reg_name);
							uni.setStorageSync("password", me.reg_pass);
							uni.setStorageSync("nickName", response.data[0].nickName);
							uni.setStorageSync("registerTime", response.data[0].time);
							if(!response.data[0].cancleMoments){
								uni.setStorageSync("cancleMoments", "");
							}else{
								uni.setStorageSync("cancleMoments", response.data[0].cancleMoments);
							}
							
							// 用户权限
							uni.setStorageSync("whoUse", response.data[0].whoUse);
							me.checkLogin();
							// 查看是否设置密保问题，如果没有设置就给出提示去设置
							if(!response.data[0].question){
								uni.showModal({
									title: '提示',
									content: '去设置密保问题，方便找回密码',
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											uni.navigateTo({
												url: './setQuestion?username='+me.reg_name
											});
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}
						} else {
							uni.showToast({
							    title: '账号或者密码不对',
							    duration: 2000,
								icon:"none"
							});
						}
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
			loginOut(){
				uni.removeStorageSync("username")
				uni.removeStorageSync("password")
				uni.removeStorageSync("nickName")
				uni.removeStorageSync("whoUse")
				uni.removeStorageSync("registerTime")
				uni.removeStorageSync("cancleMoments")
				this.checkLogin()
			},
			checkLogin(){
				this.username = uni.getStorageSync('username');
				this.password = uni.getStorageSync('password');
				this.nickName = uni.getStorageSync('nickName');
				this.registerTime = uni.getStorageSync('registerTime');
				if(this.username&&this.password){
					this.isLogin =true;
				}else{
					this.isLogin =false;
				}
				this.showWho=1;
				// if(this.isLogin){
				// 	this.showWho=1;
				// }else{
				// 	this.showWho=3;
				// }
			}
		},
		mounted() {
			this.checkLogin()
		}
	}
</script>

<style scoped>
	page{
		/* background-color: red !important; */
	}
	.content {
		
	}

	.main {
		padding: 0 20px;
	}

	.snail_change_box {
		display: flex;
		text-align: center;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #0079FE;
	}

	.snail_change_box_one {
		flex: 1;
		border: 1px solid #0079FE;
		border-radius: 5px 10px 5px 5px/5px 0px 0px 5px;
	}

	.snail_change_box_two {
		flex: 1;
		border: 1px solid #0079FE;
		border-radius: 5px 5px 5px 5px/0px 5px 5px 0px;
	}

	.snail_change_box_item_active {
		background-color: #0079FE;
		color: #fff;
	}

	input {
		height: 50px;
		border-bottom: 1px solid #f2f2f2;
	}
	.login_msg{
		text-align: center;
		line-height: 100px;
		font-size: 30px;
	}
	.zhanghao{
		font-size: 20px;
		line-height: 30px;
		/* text-align: left;
		padding-left:50px; */
		/* border-bottom: 1px solid #666; */
		
	}
	.zhuangtai{
		font-size: 30px;
		color:#0079FE;
	}
	.login_out{
		/* position: absolute;
		left: 0;
		bottom:50px;
		width: 100%; */
	}
	.tab50827_login{
		height: 80px;
		display: flex;
		padding-left:50px;
		padding-bottom: 40px;
		padding-top:30px;
	}
	.tab50827_login_left{
		width:80px;
	}
	.tab50827_login_right{
		flex:1;
		padding-top:20px;
		padding-left: 20px;
	}
	.tab50827_login_right_up{
		font-size: 20px;
		font-weight: bold;
	}
	.tab50827_login_right_down{
		color:#999;
	}
	.tab50827_box{
		display: flex;
		text-align: center;
		line-height: 20px;
		border-bottom: 1px solid #eee;
		padding-bottom: 20px;
	}
	.tab50827_box_left{
		flex:1;
	}
	.tab50827_box_center{
		flex:1;
	}
	.tab50827_box_right{
		flex:1;
	}
	.tab50827_list_item{
		height: 50px;
		border-bottom: 1px solid #eee;
		display: flex;
		line-height: 50px;
		padding-left: 20px;
	}
	.tab50827_list_item_left{
		width:50px;
	}
	.tab50827_list_item_center{
		flex:1;
	}
	.tab50827_list_item_right{
		width:50px;
	}
	.logn_box{
		width: 80%;
		min-height:200px;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		background-color: #f2f2f2;
		border-radius: 10px;
		overflow: hidden;
		padding:20px;
	}
	.login_box .content1 input{
		color: #fff;
	}
	.havename{
		height:50px;
		line-height: 50px;
		color:blue;
	}
</style>
