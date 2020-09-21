<template>
	<view>
		<view class="release_title"  >添加图片</view>
		
		<view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
			<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-if="!!img">
				<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg()">x</view>
				<image  style="width: 80%;height: 80%;"  :src="img" mode="" @click="imgView(idx)"></image>
			</view>
			<!-- <image  style="width: 25%;height: 100px;" v-for="(item ,idx) in imgArr" :key="idx" :src="item" mode="" @click="imgView(idx)"></image> -->
			<image style="width: 25%;height: 100px;" src="../../../static/jiahao.png" mode="" @click="upfile"></image>
		</view>
		<view class="btn">
			<button type="primary" @click="addData">发布公告</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:"",
			}
		},
		onLoad(options) {
			this.city = options.city
		},
		methods: {
			imgView(idx){
				var arr = [];
				arr.push(this.img);
				uni.previewImage({
					urls: arr,
					current: 0
				});
			},
			deleteThisImg(idx){
				this.img="";
			},
			upfile(){
				var that =this;
				uni.chooseImage({
					count: 1,
					// sizeType:  original 原图，compressed 压缩图，默认二者都有
					sizeType: "compressed",
					success(res) {
						console.log(res);
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths
							//进行上传操作，图片已经可以选择了，可以拿到图片数组了
							that.img = filePath[0];
							console.log(res.tempFilePaths )
							
							uni.showLoading({
								title: '上传中...',
								mask:true
							});
							uni.uploadFile({     //上传代码
	                            url:"http://139.155.90.219:3000/image1", //本地node.js服务器地址
	                            filePath:res.tempFilePaths[0],
	                            name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
	                            success:function(res){
	                                console.log(res);
									that.img=res.data;
									uni.hideLoading();
	                            }
	                       })
						}
					}
				});
			},
			addData(){
				var me = this;
				if(!this.img){
					return;
				}
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
				 url:"http://139.155.90.219:3000/addNews"+`?img=${this.img}&city=${this.city}`,
				 data:{},
				 header:{},
				 success(response) {
						uni.showToast({
						    title: '发布成功',
						    duration: 2000,
							icon:"none"
						});
						me.img = "";
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
	}
</script>

<style scoped>
	.release_title{
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: red;
	}
</style>
