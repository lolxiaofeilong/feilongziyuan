<template>
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
			<view class="btn">
				<button type="primary" @click="addData">发布公告</button>
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
				content:'',
				maxImgCount:1,
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
		onLoad(options) {
			this.city = options.city
		},
		methods: {
			close(e) {
				this.imageList.splice(e, 1);
			},
			chooseImg() { //选择图片
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: ['original'],
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
			addData(){
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.showLoading({
					title: '上传中...',
					mask:true
				});
				uni.uploadFile({     //上传代码
                     url:"http://139.155.90.219:3000/image1", //本地node.js服务器地址
                     filePath:this.imageList[0],
                     name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
                     success:function(res){
                          	console.log(res);
							me.img=res.data;
							uni.request({
							 url:"http://139.155.90.219:3000/addNews"+`?img=${me.img}&city=${me.city}`,
							 data:{},
							 header:{},
							 success(response) {
									uni.showToast({
									    title: '发布成功',
									    duration: 2000,
										icon:"none"
									});
									me.img = "";
									me.imageList.length=0;
									uni.navigateBack()
							 },
							 fail: (e) => {
								 console.log(111)
								uni.showToast({
									    title: '网络异常...',
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
                })
				
			}
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
	.release_title{
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: red;
	}
</style>