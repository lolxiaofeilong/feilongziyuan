<template>
	<view>
		<view class="main">
		            <view>联系人：{{data.name}} </view>
		            <view>电话：{{data.phone}} 
		                <!-- <van-button type="primary" size="mini" @click="copyUrl2(data.phone)">复制</van-button> -->
		            </view>
		            <view>{{data.address}}
		                <!-- <van-button type="primary" size="mini" @click="copyUrl2(data.address)">复制</van-button> -->
		            </view>
		            <view style="color:red;">{{data.discrible}}</view>
		            <h3>部分展示如下：</h3>
		            <view v-for="(item1,idx1) in data.dataVideo" :key="idx1+'-only'">
		                <!-- <video style="width:100%;" class="" :src="item1.video" initial-time="0" autoplay="true" loop="true" 
		                    ></video> -->
						<!-- <video :src="item1.video" controls object-fit="cover"></video> -->
						<video :src="item1.video" controls object-fit="cover"></video>
		            </view>
		            <scroll-view scroll-y="true" class="content" v-for="(item,idx) in data.dataImg" :key="idx">
		                <view>{{item.text}}</view>
		                <!-- <img :src="item.img" /> -->
		                <image  :src="item.img" @click="yulanImg(idx)" mode="widthFix"	lazy-load></image>
		            </scroll-view>
					<!-- <scroll-view scroll-y="true" >
						<view></view>
					</scroll-view> -->
		            
		        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		methods: {
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
			var query = uni.getStorageSync('message').substring(1);
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
			console.log(this.data)
		}
	}
</script>

<style scoped>
	.main{
	    text-align: center;
	}
	.content image{
	    width:100%;
		min-height: 240px;
	}
	video{
		width: 100%;
	}
	
</style>
