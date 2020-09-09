<template>
	<view class="content">
		<view id="tab">
		            <view style="background:#fff;padding:10px 20px;">
		                <view class="snail_change_box">
		                    <view class="snail_change_box_one " :class="{snail_change_box_item_active:tabChange==0}"
		                        @click="changeTab(0)">开发说明</view>
		                    <view class="snail_change_box_two" :class="{snail_change_box_item_active:tabChange==1}"
		                        @click="changeTab(1)">赞助者名单</view>
		                </view>
		            </view>
		        </view>
		        <view class="main">
		            <view  v-if="tabChange==0" >
		                <view style="line-height: 30px;">
		                    <view>开发者：胡飞龙</view>
		                    <view>
		                        微信号：{{weixin}} 
		                    </view>
		                    <view>
		                        联系电话：
								<text style="color:#0000FF;" @click="phoneCall(phone)">{{phone}}</text>
		                    </view> 
		                    <view>联系地址：云阳县盘石镇派出所附件</view>
		                    <!-- <view>备注：本软件是我个人开发的，有事可以通过上面的方式联系我</view> -->
		                    <view>说明：
		                        <span style="color:red;">跪求几台旧手机给我当测试手机</span>， 如果你家里有旧的手机不用了，就送给我吧，谢谢！
		                    </view>
		                </view>
		                <view style="color:green; font-size: 20px;">各位家乡的朋友们，你们好！</view>
		                <view style="color:green; text-indent: 2em;font-size: 20px;">受疫情影响，百废待兴，作为土生土长的云阳人，
		                    我觉得我有责任也有义务为我的家乡做点事情，
		                    我希望利用个人所学专门为我们云阳人做了一个软件，
		                    将云阳的资源整合起来，既能方便有需求的朋友查找，
		                    又能帮助到我们云阳的商家发展，我原意为家乡的发展奉献自己的一点微薄的力量！
		                </view>
		                <view style="text-align: center">
		                    <view>安卓下载地址：</view>
							<image src="http://139.155.90.219/app/imgs/icon/feilong_android.png" mode="widthFix"></image>
		                    <view>苹果下载地址：</view>
							<image src="http://139.155.90.219/app/imgs/icon/feilong_ios.png" mode="widthFix"></image>
		                </view>
		                
		            </view>
		            <view style="flex:1;overflow-y:scroll;" v-if="tabChange==1" >
		                
		                <h3 style="line-height: 30px;text-align:center;color:blue;" @click="changeShowErWeiMa">赞助方式(点我查看)</h3>
		                <view style="text-align: center" v-if="showErWeiMa">
							<image src="http://139.155.90.219/app/imgs/icon/feilong_weixin.png" mode="widthFix"></image>
							<image src="http://139.155.90.219/app/imgs/icon/feilong_zhifubao.jpg" mode="widthFix"></image>
		                </view>
		                <h3 style="line-height: 30px;">赞助者名单：</h3>
		                <view class="main_right">
							<view style="height:30px;border-bottom: 1px solid #ccc; line-height: 30px;" v-for="(item,idx) in suppertorData" :key="idx" @click="seeStore(item)">
								<text style="color:red;">{{item.placeName}}</text> ----- 赞助物资：{{item.money}}
							</view>
		                    <view v-if="suppertorData.length==0" style="text-align: center;line-height: 200px;">暂无数据</view>
		                </view>
		            </view>
		        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabChange: 0,
				weixin:"feilong651956368",
				phone:"17815015892",
				suppertorData:[],
				showErWeiMa:false
			}
		},
		onLoad() {

		},
		onShow: function() {
			var me = this;
			uni.onNetworkStatusChange(function(res) {
				console.log(res.networkType);
				var str = ""
				if(res.networkType=="none"){
					str = "无网络连接";
				}else{
					str = res.networkType +"已连接";
					me.getAllData();
				}
				uni.showToast({
					title: str,
					duration: 2000,
					icon: "none"
				});
			});
		},
		methods: {
			changeShowErWeiMa(){
				this.showErWeiMa=!this.showErWeiMa;
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
			changeTab: function (value) {
				console.log(value);
				this.tabChange = value;
			},
			 // 查询赞助者
			getAllData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});

				uni.request({
					 url:"http://139.155.90.219:3000/getSupporter",
					 data:{},
					 header:{},
					 success(response) {
						console.log("bannerData",response);
						me.suppertorData = response.data
					 },
					 fail: (e) => {
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
			seeStore(item){
				// 先去掉吧
				// console.log("11111111",item);
				// var str ="";
				// for(var key in item){
				// 	str += key+"="+item[key]+"&"
				// }
				// uni.setStorageSync("message", str.slice(0, -1))
				// uni.navigateTo({
				// 	url: "../../mainPage/allCounty/storeDetail"
				// });
				
			},
		},
		mounted() {
			this.getAllData();
		}
	}
</script>

<style scoped>
	page{
		background-color: #fff;
	}
	.content {
		
	}
	.main{
	    padding:0 20px;
	}
	.snail_change_box{
	    display: flex;
	    text-align: center;
	    font-size: 12px;
	    height: 30px;
	    line-height: 30px;
	    color:#0079FE;
	}
	.snail_change_box_one{
	    flex:1;
	    border:1px solid #0079FE;
	    border-radius: 5px 10px 5px 5px/5px 0px 0px 5px;
	}
	.snail_change_box_two{
	    flex:1;
	    border:1px solid #0079FE;
	    border-radius: 5px 5px 5px 5px/0px 5px 5px 0px;
	}
	.snail_change_box_item_active{
	    background-color: #0079FE;
	    color:#fff;
	}
	
	
	.main_right{
	    flex:3;
	    /* background-color: blue; */
	    overflow-y:scroll;
	}
	.main_right .item{
	    height: 100px;
	    /* background-color: red; */
	    margin-bottom: 10px;
	    display: flex;
	    background: #ccc
	}
	.main_right .item .item_img{
		width: 50px;
	    /* flex:1; */
	    /* background-color: blue; */
	}
	.main_right .item .item_img image{
	    width: 100%;
	    height: 100%;
	}
	.main_right .item .item_txt{
	    flex:1;
	    padding-left: 10px;
	    /* background-color: #fff; */
	    overflow: hidden;
	}
	.address{
	    width:100%;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    word-break: break-all;
	}
	.xx{
	    line-height: 83px;
	    text-align: center;
	}
</style>
