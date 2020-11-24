<template>
	<view>
		<view class="main">
			<view style="padding-left: 30px;">
				<view>联系人：{{data.name}} </view>
				<view @click="phoneCall(data.phone)" >电话：<text style="color:blue">{{data.phone}} </text>
				    <!-- <van-button type="primary" size="mini" @click="copyUrl2(data.phone)">复制</van-button> -->
				</view>
				<view>地址：{{data.address}}
				    <!-- <van-button type="primary" size="mini" @click="copyUrl2(data.address)">复制</van-button> -->
				</view>
				<view >标签：<text style="color:#369;">{{data.searchLabel}}</text></view>
				<view style="color:red;">说明：{{data.discrible}}</view>
			</view>
		            <h1 style="text-align: center;">部分展示如下：</h1>
		            <view v-for="(item1,idx1) in data.dataVideo" :key="idx1+'-only'">
		                <!-- <video style="width:100%;" class="" :src="item1.video" initial-time="0" autoplay="true" loop="true" 
		                    ></video> -->
						<!-- <video :src="item1.video" controls object-fit="cover"></video> -->
						<video :src="item1.video" controls object-fit="cover"></video>
		            </view>
					<view v-if="data.dataImg.length>1" style="display: flex;flex-wrap: wrap;">
						<scroll-view scroll-y="true" style="width:50%;" class="content" v-for="(item,idx) in data.dataImg" :key="idx">
						    <!-- <view>{{item.text}}</view> -->
						    <image  :src="item.img" @click="yulanImg(idx)"  mode="widthFix"	lazy-load></image>
						</scroll-view>
					</view>
					<view v-else style="display: flex;flex-wrap: wrap;">
						<scroll-view scroll-y="true"  class="content" v-for="(item,idx) in data.dataImg" :key="idx">
						    <!-- <view>{{item.text}}</view> -->
						    <image  :src="item.img" @click="yulanImg(idx)"  mode="widthFix"	lazy-load></image>
						</scroll-view>
					</view>
		            
		        </view>
			<!-- 浮标 -->
			<view class="" v-if="admin">
				<uni-fab ref="fab" :pattern="pattern"  :horizontal="horizontal" :vertical="vertical" direction=""  @fabClick="fabClick" />
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{},
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				admin:0,
			}
		},
		methods: {
			fabClick() {
				uni.navigateTo({
					url: './modify'
				});
			},
			adminShow(){
				this.whoUse = uni.getStorageSync('whoUse');
				if(this.whoUse){
					this.admin = 1
				}else{
					this.admin = 0
				}
			},
			// 打电话
			phoneCall(num){
				uni.makePhoneCall({
					phoneNumber: num,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			yulanImg(idx){
				var imgdata = this.data.dataImg;
				var imgArr =[];
				for(var i=0;i<imgdata.length;i++){
					imgArr.push(imgdata[i].img)
				}
				console.log(idx,imgArr)
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[idx]
				});
			}
		},
		mounted() {
			var query = uni.getStorageSync('message');
			var vars = query.split("&");
			var obj ={};
			var dataImg=[];
			var dataVideo=[];
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				console.log("pair[0]", pair[0])
				// 对图片数据进行拆分
				if(pair[0]=="imgs" && pair[1]!="null"){
					console.log(pair[1]);
					var str = pair[1];
					var arr = str.slice(0,-1).split(";");
					for(var j=0;j<arr.length;j++){
						var arr1 = arr[j].split(",")
						var obj1 ={
							img: arr1[0],
							text: decodeURIComponent(arr1[1])
						}
						dataImg.push(obj1)
					}
					obj.dataImg = dataImg;
				}
				else if(pair[0] == "video" && pair[1] != "null"){
					var str1 = pair[1];
					var arr2 = str1.slice(0, -1).split(";");
					for (var k = 0; k < arr2.length; k++) {
						var arr3 = arr2[k].split(",")
						var obj2 = {
							video: arr3[0],
							text: decodeURIComponent(arr3[1])
						}
						dataVideo.push(obj2)
					}
					obj.dataVideo = dataVideo;
				}
				else{
					obj[pair[0]]= decodeURIComponent(pair[1])
				}
				
				// console.log(obj)
			}
			this.data=obj
			console.log(this.data);
			this.adminShow();
		}
	}
</script>

<style scoped>
	.main{
	    /* text-align: center; */
	}
	.content image{
	    width:100%;
		min-height: 240px;
	}
	video{
		width: 100%;
	}
	
</style>
