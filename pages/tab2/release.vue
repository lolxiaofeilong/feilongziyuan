<template>
	<view class="bigBox">
		<view class="main">
			<view class="release_title"> 标题：</view>
			<input type="text" v-model="title" placeholder="请输入标题" />
			<view class="release_title"> 联系人：</view>
			<input type="text" v-model="name" placeholder="请输入联系人姓名" />
			<view class="release_title"> 联系电话：</view>
			<input type="text" v-model="phone" placeholder="请输入联系人电话" />
			<view class="release_title"> 价格：</view>
			<input type="text" v-model="price" placeholder="请输入价格" />
			<view class="release_title"> 具体内容：（<text style="color:red;">必填</text>）</view>
			<textarea v-model="content" placeholder="请输入详细内容" maxlength="-1" auto-height />

			<view class="release_title"  >添加图片</view> 
			
			<view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
				<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item ,idx) in imgArr" :key="idx">
					<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg(idx)">x</view>
					<image  style="width: 80%;height: 80%;"  :src="item" mode="" @click="imgView(idx)"></image>
				</view>
				<!-- <image  style="width: 25%;height: 100px;" v-for="(item ,idx) in imgArr" :key="idx" :src="item" mode="" @click="imgView(idx)"></image> -->
				<image style="width: 25%;height: 100px;" src="../../static/jiahao.png" mode="" @click="upfile"></image>
			</view>
		</view>
		<view class="btn">
			<button type="primary" @click="addData">发布消息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				phone: "",
				price: "",
				title: "",
				content: "",
				releaseTime: "",
				imgArr:[],
				fuwuqiImgData:[]
			}
		},
		onLoad() {
			this.checkLogin();
		},
		methods: {
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
			 // 添加数据
			addData() {
				// 验证数据不能为空
				// if(!this.title){
				// 	uni.showToast({
				// 	    title: '请填写标题',
				// 	    duration: 2000,
				// 		icon:"none"
				// 	});
				// 	return false;
				// }
				// if(!this.name){
				// 	uni.showToast({
				// 	    title: '请填写联系人',
				// 	    duration: 2000,
				// 		icon:"none"
				// 	});
				// 	return false;
				// }
				// if(!this.phone){
				// 	uni.showToast({
				// 	    title: '请填写联系电话',
				// 	    duration: 2000,
				// 		icon:"none"
				// 	});
				// 	return false;
				// }
				// if(!this.price){
				// 	uni.showToast({
				// 	    title: '请填写价格',
				// 	    duration: 2000,
				// 		icon:"none"
				// 	});
				// 	return false;
				// }
				if(!this.content){
					uni.showToast({
					    title: '请填写具体内容',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				var me = this;
				var username = uni.getStorageSync('username');
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				var imgStr = "";
				if(this.fuwuqiImgData.length>0){
					imgStr = JSON.stringify(this.fuwuqiImgData); 
				}
				uni.request({
				 url:"http://139.155.90.219:3000/addHelps"+`?name=${this.name}&phone=${this.phone}&price=${this.price}&title=${this.title}&content=${this.content}&releaseTime=${this.releaseTime}&username=${username}&img=${imgStr}`,
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
			upfile(){
				var that =this;
				if(that.imgArr.length==9){
					uni.showToast({
					    title: '最多只能添加9张',
					    duration: 2000,
						icon:"none"
					});
					return false;
				}
				uni.chooseImage({
				    count: 9-that.imgArr.length,
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
								uni.showLoading({
								    title: '上传中...',
									mask:true
								});
								uni.uploadFile({     //上传代码
		                            url:"http://139.155.90.219:3000/image", //本地node.js服务器地址
		                            filePath:res.tempFilePaths[i],
		                            name:"file",    //这个东西有点类似与 form表单中的  name值 在后面也需要这个
		                            success:function(res){
		                                console.log(res);
										that.fuwuqiImgData.push(res.data);
										uni.hideLoading();
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
			this.releaseTime=this.getDate();
			
		}
	}
</script>

<style>
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
	    padding:0 10px;
	}
	.release_title{
	    height: 50px;
	    line-height: 50px;
	}
	input{
		height: 30px;
		border-bottom:1px solid #ccc;
	}
	textarea{		
		min-height: 50px;
		border-bottom:1px solid #ccc;
		width: 100%;
	}
</style>
