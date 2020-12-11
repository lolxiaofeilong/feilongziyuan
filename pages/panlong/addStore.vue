<template>
	<view class="content">
		<view class="main">
			<view style="flex:1;overflow-y:scroll;" >
				<input type="text" v-model="city" placeholder="乡镇" />
				<input type="text" v-model="classic" placeholder="分类" />
				<!-- <textarea v-model="img" placeholder="列表图片" maxlength="-1" auto-height /> -->
				<input type="text" v-model="placeName" placeholder="店铺名称" />
				<input type="text" v-model="name" placeholder="店主姓名" />
				<input type="text" v-model="phone" placeholder="联系电话" />
				<input type="text" v-model="address" placeholder="地址" />
				<input type="text" v-model="discrible" placeholder="描述" />
				<input type="text" v-model="searchLabel" placeholder="搜索标签" />
				<input type="text" v-model="jianjie" placeholder="图片介绍" />
				<view class="release_title"  >添加店铺图片</view>
				
				<!-- <view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
					<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item ,idx) in imgArr" :key="idx">
						<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg(idx)">x</view>
						<image  style="width: 80%;height: 80%;"  :src="item" mode="" @click="imgView(idx)"></image>
					</view>
					<image style="width: 25%;height: 100px;" src="../../../static/jiahao.png" mode="" @click="upfile"></image>
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
				
				<!-- <textarea v-model="imgs" placeholder="图片地址" maxlength="-1" auto-height /> -->
				<!-- <input type="text" v-model="video" placeholder="视频地址" /> -->
				<button type="primary" @click="addStore">添加店铺</button>
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
				city: "盘龙街道",
				classic: "",
				// 录入店铺的数据
				img: "",
				placeName: "",
				name: "",
				phone: "",
				address: "",
				discrible: "",
				jianjie: "", //每张图片的简介
				imgs: "",
				searchLabel:"",
				video: null,
				imgArr:[],
				fuwuqiImgData:[],
				count:0
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
			this.city = options.city;
			this.classic = options.classic;
			// console.log(this.place)
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
						me.img = this.imageList[0];
						me.imgs =this.imageList.join(";")
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
			addStore: function() {
				var me = this;
				if(!this.city){
					uni.showToast({
					    title: '乡镇地址必填',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				if(!this.classic){
					uni.showToast({
					    title: '分类必填',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				// 将图片上传到服务器
				for(var i=0;i<me.imageList.length;i++){
					uni.showLoading({
						title: '上传中...',
						mask:true
					});
					uni.uploadFile({     //上传代码
                            url:"http://139.155.90.219:3000/image1", //本地node.js服务器地址
                            filePath:me.imageList[i],
                            name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
                            success:function(res){
								me.count++;
                                console.log(res);
								me.fuwuqiImgData.push(res.data);
								me.img = me.fuwuqiImgData[0];
								me.imgs =me.fuwuqiImgData.join(";")
								// 最后一张上传完成之后去掉loading,并且更新到服务器
									console.log("图片上传成功了哟",me.count)
								if(me.count==me.imageList.length){
									console.log("开始上传这条数据到服务器");
									
									var imgStr = "";
									if(me.fuwuqiImgData.length>0){
										for(var i=0;i<me.fuwuqiImgData.length;i++){
											me.fuwuqiImgData[i] = me.fuwuqiImgData[i]+","+me.jianjie ;
										}
										imgStr = me.fuwuqiImgData.join(";")
									}
									uni.request({
									 url:"http://139.155.90.219:3000/addStore2020"+`?city=${me.city}&img=${me.img}&placeName=${me.placeName}&name=${me.name}&phone=${me.phone}&address=${me.address}&discrible=${me.discrible}&classic=${me.classic}&searchLabel=${me.searchLabel}`,
									 data:{},
									 header:{},
									 success(response) {
											uni.showToast({
											    title: '发布成功',
											    duration: 2000,
												icon:"none"
											});
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
                            }
                       })
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	.content {}
	
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
	
	
	.main_right {
		flex: 3;
		/* background-color: blue; */
		overflow-y: scroll;
	}
	
	.main_right .item {
		height: 100px;
		/* background-color: red; */
		margin-bottom: 10px;
		display: flex;
		background: #ccc
	}
	
	.main_right .item .item_img {
		width: 50px;
		/* flex:1; */
		/* background-color: blue; */
	}
	
	.main_right .item .item_img image {
		width: 100%;
		height: 100%;
	}
	
	.main_right .item .item_txt {
		flex: 1;
		padding-left: 10px;
		/* background-color: #fff; */
		overflow: hidden;
	}
	
	.address {
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	
	.xx {
		line-height: 83px;
		text-align: center;
	}
	
	input {
		height: 50px;
		border-bottom: 1px solid #f2f2f2;
	}

</style>