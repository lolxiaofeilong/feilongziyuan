<template>
	<view class="main" style="padding:10px">
			<!-- <view class="release_title"> 标题：</view> -->
			<input type="text" v-model="title" placeholder="请输入标题" />
			<!-- <view class="release_title"> 联系人：</view> -->
			<input type="text" v-model="name" placeholder="请输入联系人姓名" />
			<!-- <view class="release_title"> 联系电话：</view> -->
			<input type="text" v-model="phone" placeholder="请输入联系人电话" />
			<!-- <view class="release_title"> 价格：</view> -->
			<input type="text" v-model="price" placeholder="请输入价格" />
			<!-- <view class="release_title"> 具体内容：（<text style="color:red;">必填</text>）</view> -->
			<textarea v-model="content" placeholder="请输入详细内容" maxlength="-1" auto-height />
	
			<!-- <view class="release_title"  >添加图片</view> -->
			
			<!-- <view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
				<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item ,idx) in imgArr" :key="idx">
					<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg(idx)">x</view>
					<image  style="width: 80%;height: 80%;"  :src="item" mode="" @click="imgView(idx)"></image>
				</view>
				<image style="width: 25%;height: 100px;" src="../../static/jiahao.png" mode="" @click="upfile"></image>
			</view> -->
			<view class="moment-trends-add">
				<view class="uni-uploader-body onepx-line-bottom">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;" @click.stop="previewImage(index)">
								<image mode="aspectFill" class="uni-uploader__img" :src="image"></image>
								<view class="close-view" @click.stop="close(index)">x</view>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-show="imageList.length < maxImgCount">
							<view class="uni-uploader__input" @tap="chooseImg"></view>
						</view>
					</view> 
				</view>
			</view>
			<view class="btn">
				<button type="primary" @click="addData">发布消息</button>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import compressImage from '@/common/util.js';
	const device = uni.getSystemInfoSync();
	console.log("device:======================== " + JSON.stringify(device));
	export default {
		data() {
			return {
				imageList: [],
				// content:'',
				maxImgCount:9,
				name: "",
				phone: "",
				price: "",
				title: "",
				content: "",
				releaseTime: "",
				imgArr:[],
				fuwuqiImgData:[],
				 count:0,//记录上传了几张图片了
			};
		},
		async onNavigationBarButtonTap(e) {
			if(this.imageList.length === 0 && this.content.trim() === ""){
				uni.showModal({
					content: '请说点什么吧！',
					showCancel: false,
					confirmText: "确定"
				});
				return;
			}
			uni.showModal({
				content: '发送成功！',
					showCancel: false,
					confirmText: "确定"
			})
		},
		methods: {
			close(e) {
				this.imageList.splice(e, 1);
			},
			chooseImg() { //选择图片
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: ['compressed'],
					count: this.maxImgCount - this.imageList.length,
					success: async (res) => {
						const tempFilePaths = res.tempFilePaths;
						let tempPathList = [];
						for (let i = 0; i < tempFilePaths.length; i++) {
							const path = tempFilePaths[i];
							const src = await this.compressImageHandler(path)
							tempPathList.push(src);
						}
						this.imageList = this.imageList.concat(tempPathList);
					}
				})
			},
			previewImage(index) { //预览图片
				uni.previewImage({
					urls: this.imageList,
					current: this.imageList[index]
				});
			},
			async compressImageHandler(src){
				console.log('platform==='+device.platform)
				const tempPath = await compressImage(src,device.platform);
				console.log('tempPath-----'+tempPath);
				return tempPath
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
			}, // 添加数据
			addData() {
				if(!this.content){
					uni.showToast({
					    title: '请填写具体内容',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				var me = this;
				// var username = uni.getStorageSync('username');
				var username = uni.getStorageSync('nickName');
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				
				// 如果图片存在的话
				if(me.imageList.length>0){
					// 将图片上传到服务器
									for(var i=0;i<me.imageList.length;i++){
										uni.showLoading({
											title: '上传中...',
											mask:true
										});
										uni.uploadFile({     //上传代码
					                            url:"http://139.155.90.219:3000/image", //本地node.js服务器地址
					                            filePath:me.imageList[i],
					                            name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
					                            success:function(res){
													me.count++;
					                                console.log(res);
													me.fuwuqiImgData.push(res.data);
													// 最后一张上传完成之后去掉loading,并且更新到服务器
														console.log("图片上传成功了哟",me.count)
													if(me.count==me.imageList.length){
														console.log("开始上传这条数据到服务器");
														
														var imgStr = "";
														if(me.fuwuqiImgData.length>0){
															imgStr = JSON.stringify(me.fuwuqiImgData); 
														}
														uni.request({
														 url:"http://139.155.90.219:3000/addHelps"+`?name=${me.name}&phone=${me.phone}&price=${me.price}&title=${me.title}&content=${me.content}&releaseTime=${me.releaseTime}&username=${username}&img=${imgStr}`,
														 data:{},
														 header:{},
														 success(response) {
																uni.showToast({
																    title: '发布成功',
																    duration: 2000,
																	icon:"none"
																});
																setTimeout(function(){
																	uni.navigateBack();
																},1000)
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
													}
					                            }
					                       })
									}
				}else{
					var imgStr = "";
					if(me.fuwuqiImgData.length>0){
						imgStr = JSON.stringify(me.fuwuqiImgData); 
					}
					uni.request({
					 url:"http://139.155.90.219:3000/addHelps"+`?name=${me.name}&phone=${me.phone}&price=${me.price}&title=${me.title}&content=${me.content}&releaseTime=${me.releaseTime}&username=${username}&img=${imgStr}`,
					 data:{},
					 header:{},
					 success(response) {
							uni.showToast({
							    title: '发布成功',
							    duration: 2000,
								icon:"none"
							});
							setTimeout(function(){
								uni.navigateBack();
							},1000)
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
				}
				
				
				
				
			},
			// 防止强制进入
			checkLogin(){
				this.username = uni.getStorageSync('username');
				this.password = uni.getStorageSync('password');
				if(this.username&&this.password){
					
				}else{
					// uni.switchTab({
					//     url: '../tabbar/tabbar-1/login'
					// });
					uni.navigateTo({
						url: '../tabbar-1/login'
					});
				}
			},
		},
		mounted() {
			this.releaseTime=this.getDate();
		}
	}
</script>

<style lang="scss">
	.moment-trends-add{ 
		padding: 10upx 20upx;
	}
	
	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}
	
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.uni-uploader-info {
		color: #B2B2B2;
	}
	
	.uni-uploader-body {
		padding-bottom: 20upx;
	}
	
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.uni-uploader__file {
		margin: 8upx;
		width: 220upx;
		height: 220upx;
	}
	
	.uni-uploader__img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.uni-uploader__input-box {
		position: relative;
		margin: 8upx;
		width: 218upx;
		height: 218upx;
		border: 2upx dashed #CCCCCC;
	}
	
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	
	.uni-uploader__input-box:before {
		width: 2upx;
		height: 42upx;
	}
	
	.uni-uploader__input-box:after {
		width: 42upx;
		height: 2upx;
	}
	
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
	
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.close-view {
		text-align: center;
		line-height: 28upx;
		height: 32upx;
		width: 32upx;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -12upx;
		right: -8upx;
		font-size: 24upx;
	}
	.mycanvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		visibility: hidden;
	}
	.bigBox{
		display: flex;
		flex-direction: column;
	}
	.btn{
		/* width: 100%; */
		/* height: 50px; */
		/* position: absolute; */
		/* left:0; */
		/* bottom: 0; */
		flex:1;
	}
	.main{
	    /* flex:10; */
	    overflow-y:scroll;
	    /* background-color: red; */
	    margin: 0;
	    // padding:0 10px;
	}
	.release_title{
	    height: 50px;
	    line-height: 50px;
	}
	input{
		height: 40px;
		border:1px solid #ccc;
		margin-bottom: 30px;
		border-radius: 6px;
		padding-left: 10px;
	}
	textarea{		
		min-height: 100px;
		border:1px solid #ccc;
		width: 92%;
		line-height: 40px;
		border-radius: 6px;
		padding-left: 10px;
	}
</style>
