<template>
	<view>
		<view class="release_title"> 地区：</view>
		<input type="text" v-model="data.city" />
		<view class="release_title"> 分类：</view>
		<input type="text" v-model="data.classic"  />
		<view class="release_title"> 搜索标签：</view>
		<input type="text" v-model="data.searchLabel"  />
		<view class="release_title"> 详细地址：</view>
		<input type="text" v-model="data.address" />
		<view class="release_title"> 联系人：</view>
		<input type="text" v-model="data.name"  />
		<view class="release_title"> 联系电话：</view>
		<input type="text" v-model="data.phone"  />
		<view class="release_title"> 列表图片：</view>
		<textarea v-model="data.img"  maxlength="-1" auto-height />
		<view class="release_title"> 详情图片：</view>
		<textarea v-model="data.imgs"  maxlength="-1" auto-height />
		<view class="release_title"> 店铺描述：</view>
		<textarea v-model="data.discrible"  maxlength="-1" auto-height />
		
		<view class="release_title"  >添加图片</view>
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
		<button type="primary" @click="upDateData">修改数据</button>
		
		<!-- <textarea v-model="content" placeholder="请输入详细内容" maxlength="-1" auto-height /> -->
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
				maxImgCount:6,
				data:{
					city: "",
					address: "",
					classic: "",
					discrible: "",
					id: "",
					img: "",
					imgs: "",
					link: "",
					name: "",
					phone: "",
					placeName: "",
					video: ""
				},
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
				console.log('platform==='+device.platform);
				const tempPath = await compressImage(src,device.platform);
				console.log('tempPath-----'+tempPath);
				return tempPath
			},
			getData(){
				var query = uni.getStorageSync('message');
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					this.data[pair[0]]=pair[1];
					
				}
				console.log(this.data);
				// 将图片详情中的图片拆出来放到数组中
				var arr = this.data.imgs.split(";");
				for(var i=0;i<arr.length;i++){
					var idx = arr[i].indexOf(",")
					var str = arr[i].slice(0,idx);
					this.fuwuqiImgData.push(str);
				}
				console.log("this.fuwuqiImgData",this.fuwuqiImgData)
				
			},
			upDateData(){
				var me = this;
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
								// 最后一张上传完成之后去掉loading,并且更新到服务器
									console.log("图片上传成功了哟",me.count)
								if(me.count==me.imageList.length){
									console.log("开始上传这条数据到服务器");
									var imgStr = ";"
									if(me.fuwuqiImgData.length>0){
										for(var i=0;i<me.fuwuqiImgData.length;i++){
											me.fuwuqiImgData[i] = me.fuwuqiImgData[i]+",";
										}
										imgStr = me.fuwuqiImgData.join(";")
									}
									uni.request({
									 url:"http://139.155.90.219:3000/upDateStore"+`?city=${me.data.city}&address=${me.data.address}&classic=${me.data.classic}&discrible=${me.data.discrible}&id=${me.data.id}&img=${me.data.img}&imgs=${imgStr}&name=${me.data.name}&phone=${me.data.phone}&placeName=${me.data.placeName}&searchLabel=${me.data.searchLabel}`,
									 data:{},
									 header:{},
									 success(response) {
											uni.showToast({
											    title: '更新成功',
											    duration: 2000,
												icon:"none"
											});
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
		},
		mounted(){
			this.getData();
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
	.trends-text{
		padding-top: 10upx;
		.textarea{
			font-size:30upx;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:#999999;
			line-height:42upx;
			width: 100%;
			height: 400px;
		}
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
	    height: 50px;
	    line-height: 50px;
		font-size: 20px;
		font-weight: bold;
	}
	input{
		padding-left: 20px;
		height: 30px;
		border-bottom:1px solid #ccc;
	}
	textarea{	
		padding-left: 20px;
		min-height: 50px;
		border-bottom:1px solid #ccc;
		width: 100%;
	}
</style>