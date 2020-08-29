<template>
	<view class="content">
		<view id="tab">
			<view style="background:#fff;padding:10px 20px;">
				<view class="snail_change_box">
					<view class="snail_change_box_one " :class="{snail_change_box_item_active:tabChange==0}" @click="changeTab(0)">录入分类</view>
					<view class="snail_change_box_two" :class="{snail_change_box_item_active:tabChange==1}" @click="changeTab(1)">录入店铺</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view v-if="tabChange==0">
				<input type="text" v-model="city" placeholder="云阳县" />
				<input type="text" v-model="classic" placeholder="分类" />
				<button type="primary" @click="addClassic">添加分类</button>
			</view>
			<view style="flex:1;overflow-y:scroll;" v-if="tabChange==1">
				<input type="text" v-model="city1" placeholder="乡镇" />
				<textarea v-model="img" placeholder="列表图片" maxlength="-1" auto-height />
				<input type="text" v-model="placeName" placeholder="店铺名称" />
				<input type="text" v-model="name" placeholder="店主姓名" />
				<input type="text" v-model="phone" placeholder="联系电话" />
				<input type="text" v-model="address" placeholder="地址" />
				<input type="text" v-model="discrible" placeholder="描述" />
				<input type="text" v-model="classic1" placeholder="分类" />
				<input type="text" v-model="jianjie" placeholder="图片介绍" />
				<view class="release_title"  >添加图片</view>
				
				<view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
					<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item ,idx) in imgArr" :key="idx">
						<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg(idx)">x</view>
						<image  style="width: 80%;height: 80%;"  :src="item" mode="" @click="imgView(idx)"></image>
					</view>
					<!-- <image  style="width: 25%;height: 100px;" v-for="(item ,idx) in imgArr" :key="idx" :src="item" mode="" @click="imgView(idx)"></image> -->
					<image style="width: 25%;height: 100px;" src="../../../static/jiahao.png" mode="" @click="upfile"></image>
				</view>
				<textarea v-model="imgs" placeholder="图片地址" maxlength="-1" auto-height />
				<input type="text" v-model="video" placeholder="视频地址" />
				<button type="primary" @click="addStore">添加店铺</button>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabChange: 0,
				city: "云阳县",
				classic: "",
				// 录入店铺的数据
				city1: "盘龙街道",
				img: "",
				placeName: "",
				name: "",
				phone: "",
				address: "",
				discrible: "",
				classic1: "",
				jianjie: "", //每张图片的简介
				imgs: "",
				video: null,
				imgArr:[],
				fuwuqiImgData:[]

			}
		},
		onLoad() {

		},
		onShow: function() {

		},
		methods: {
			changeTab: function(value) {
				console.log(value);
				this.tabChange = value;
			},
			addClassic: function() {
				var me = this;
				if (!this.classic) {
					uni.showToast({
						title: '请填写分类',
						duration: 2000,
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				var username = uni.getStorageSync('username');
				if (username) {
					uni.request({
						url: "http://139.155.90.219:3000/addClassic" + `?classic=${this.classic}&city=${this.city}`,
						data: {},
						header: {},
						success(response) {
							uni.showToast({
								title: '添加成功',
								duration: 2000,
								icon: "none"
							});
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
			addStore: function() {
				if(!this.city1){
					uni.showToast({
					    title: '乡镇地址必填',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				if(!this.classic1){
					uni.showToast({
					    title: '分类必填',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				
				var imgStr = "";
				if(this.fuwuqiImgData.length>0){
					for(var i=0;i<this.fuwuqiImgData.length;i++){
						this.fuwuqiImgData[i] = this.fuwuqiImgData[i]+","+this.jianjie ;
					}
					imgStr = this.fuwuqiImgData.join(";")
				}
				uni.request({
				 url:"http://139.155.90.219:3000/addStore1"+`?city=${this.city1}&img=${this.img}&placeName=${this.placeName}&name=${this.name}&phone=${this.phone}&address=${this.address}&discrible=${this.discrible}&classic=${this.classic1}&imgs=${imgStr}&video=${this.video}`,
				 data:{},
				 header:{},
				 success(response) {
						uni.showToast({
						    title: '发布成功',
						    duration: 2000,
							icon:"none"
						});
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
			upfile(){
					var that =this;
					uni.chooseImage({
					    count:50,
						// sizeType:  original 原图，compressed 压缩图，默认二者都有
						sizeType: "compressed",
					    success(res) {
					        console.log(res);
							console.log(that.imgArr)
					        if (res.tempFilePaths.length > 0) {
					            let filePath = res.tempFilePaths
					            //进行上传操作，图片已经可以选择了，可以拿到图片数组了
								that.imgArr = that.imgArr.concat(filePath);
								console.log(res.tempFilePaths )
								for(var i=0;i<filePath.length;i++){
									uni.uploadFile({     //上传代码
			                            url:"http://139.155.90.219:3000/image1", //本地node.js服务器地址
			                            filePath:res.tempFilePaths[i],
			                            name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
			                            success:function(res){
			                                console.log(res);
											that.fuwuqiImgData.push(res.data);
											that.img = that.fuwuqiImgData[0];
											that.imgs =that.fuwuqiImgData.join(";")
			                            }
			                       })
								}
					        }
					    }
					});
				},
				imgView(idx){
					uni.previewImage({
						urls: this.imgArr,
						current: idx
					});
				},
				deleteThisImg(idx){
					this.imgArr.splice(idx,1);
					that.fuwuqiImgData.splice(idx,1);
					console.log(this.imgArr)
					console.log(this.fuwuqiImgData)
				},
		},
		mounted() {

		}
	}
</script>

<style scoped>
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
