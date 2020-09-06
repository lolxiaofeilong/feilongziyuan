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
		<view class="" style="display: flex;flex-wrap: wrap; dimin-height:100px;max-height:200px;overflow-y: scroll;border:1px solid #ccc;margin-bottom: 10px;"  >
			<view class="imgItem" style="width:25%;height: 100px;position: relative;padding-top: 20px;" v-for="(item ,idx) in imgArr" :key="idx">
				<view class="" style="position: absolute;right:0;top:0;width:40px;heihgt:20px;text-align: center;font-size: 20px; line-height: 20px;color:red;" @click="deleteThisImg(idx)">x</view>
				<image  style="width: 80%;height: 80%;"  :src="item" mode="" @click="imgView(idx)"></image>
			</view>
			<!-- <image  style="width: 25%;height: 100px;" v-for="(item ,idx) in imgArr" :key="idx" :src="item" mode="" @click="imgView(idx)"></image> -->
			<image style="width: 25%;height: 100px;" src="../../../static/jiahao.png" mode="" @click="upfile"></image>
		</view>
		<button type="primary" @click="upDateData">修改数据</button>
		
		<!-- <textarea v-model="content" placeholder="请输入详细内容" maxlength="-1" auto-height /> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				fuwuqiImgData:[]
			}
		},
		methods: {
			upDateData(){
				var imgStr = ";"
				if(this.fuwuqiImgData.length>0){
					for(var i=0;i<this.fuwuqiImgData.length;i++){
						this.fuwuqiImgData[i] = this.fuwuqiImgData[i]+",";
					}
					imgStr = this.fuwuqiImgData.join(";")
				}
				uni.request({
				 url:"http://139.155.90.219:3000/upDateStore"+`?city=${this.data.city}&address=${this.data.address}&classic=${this.data.classic}&discrible=${this.data.discrible}&id=${this.data.id}&img=${this.data.img}&imgs=${imgStr}&name=${this.data.name}&phone=${this.data.phone}&placeName=${this.data.placeName}&searchLabel=${this.data.searchLabel}`,
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
											that.data.imgs =that.fuwuqiImgData.join(";")
			                            }
			                       })
								}
					        }
					    }
					});
				},
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style scoped>
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
