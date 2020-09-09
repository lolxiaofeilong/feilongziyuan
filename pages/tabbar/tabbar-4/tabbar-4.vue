<template>
	<view class="content">
		<view class="snail_list_box" v-for="(item,idx) in dataList" :key="idx" @click="seeDetail(item.id)">
			<view class="snail_list_box_one">
				<view class="snail_list_box_one_name">{{item.OrderTitle}}</view>
				<view class="snail_list_box_one_money">{{item.OrderAmount}}</view>
			</view>
			<view class="snail_list_box_two">{{item.OrderContent}}</view>
			<view class="snail_list_box_three">
				<view class="snail_list_box_three_left">
					<view class="snail_list_box_three_left_up">过期时间：{{item.deadTime}}</view>
					<view class="snail_list_box_three_left_down">联系人：{{item.ReleaseName}}</view>
				</view>
				<view class="snail_list_box_three_right">
					<view class='snail_list_box_three_right_text snail_list_box_three_right_text_color1' v-if="item.Status==1">待审核</view>
					<view class='snail_list_box_three_right_text snail_list_box_three_right_text_color3'  v-if="item.Status==3">已接单</view>
					<view class='snail_list_box_three_right_text snail_list_box_three_right_text_color4'  v-if="item.Status==4">已完成</view>
					
					<view class='snail_list_box_three_right_text snail_list_box_three_right_text_color2'  v-if="isDie(item)">待接单</view>
					<view class='snail_list_box_three_right_text1 '  v-if="isDie1(item)"><img src="static/overTime.png" /></view>
				</view>
			</view>
		</view>
		<view class="loading">{{loadingTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				limit:10,
				dataList:[],
				isfabuperson:false,
				isjiedanperson:false,
				loadingTxt:'加载更多',
			}
		},
		onLoad() {

		},
		
		onShow: function() {
			this.dataList = [];
			this.page=1;
			this.getAllData();
		},
		// 点击导航栏的发布按钮
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			this.username = uni.getStorageSync('username');
			this.password = uni.getStorageSync('password');
			console.log("点击了自定义按钮",this.username,this.password);
			if(this.username&&this.password){
				uni.navigateTo({
					url: "./release"
				});
			}else{
				uni.showModal({
				    title: '提示',
				    content: '发布任务需要登陆，是否立即去登陆',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							// uni.switchTab({
							//     url: '../tabbar-1/login'
							// });
							uni.navigateTo({
								url: '../tabbar-1/login'
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
			
		},
		methods: {
			isDie(item){
				console.log(11111,item);
				var timeNow = Date.now();
				var timeDie = Date.parse(item.deadTime);
				if(item.Status==2 && timeNow<timeDie){
					return true;
				}else {
					return false;
				}
			},
			isDie1(item){
				console.log(11111,item);
				var timeNow = Date.now();
				var timeDie = Date.parse(item.deadTime);
				if(item.Status==2 && timeNow>timeDie){
					return true;
				}else{
					return false;
				}
			},
			seeDetail(id){
				uni.navigateTo({
					url: "./detail?id="+id
				});
			},
			onReachBottom() {
				// 阻止重复加载
				if(this.timer !== null){
					clearTimeout(this.timer)
				}
				this.timer=setTimeout(()=>this.getAllData(),500)
			},
			// 查询所有数据
			getAllData() {
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
			
				uni.request({
					url: "http://139.155.90.219:3000/getHelps_new"+ `?limit=${me.limit}&page=${me.page}`,
					data: {},
					header: {},
					success(response) {
						 if(response.data.length ==0){
							me.loadingTxt="已经加载全部"
							return
						}
						for(var i=0;i<response.data.length;i++){
							if(response.data[i].img){
								response.data[i].img = JSON.parse(response.data[i].img);
							}
						}
						me.dataList = me.dataList.concat(response.data) 
						me.page++;
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
		},
		mounted() {
		}
	}
</script>

<style scoped>
	page{
		background-color: #f2f2f2;
	}
	.snail_list_box{
	    min-height:120px;
	    padding:10px;
	    background-color: #fff;
	    margin:10px;
	    padding-bottom: 0;
	    border-radius: 5px;
		border:1px solid #ccc;
		
	
	}
	.snail_list_box_one{
	    height: 23px;
	    display: flex;
	    margin-bottom:10px;
	    color:#666;
	    font-weight: bold;
		font-size: 18px;
		color:red;
	}
	.snail_list_box_one_name{
	    flex:1;
	    /* width:255px; */
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.snail_list_box_one_money{
	    min-width:80px;
	    color:red;
	    text-align: right;
	    max-width: 150px;
	     overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.snail_list_box_two{
	    min-height: 24px;
	    max-height: 48px;
	    font-size: 14px;
	    color:#666;
	    text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    line-clamp: 2;
	    -webkit-box-orient: vertical;
	    line-height: 22px;
		color:#000;
	}
	.snail_list_box_three{
	    /* height: 40px; */
	    display:flex;
		margin-top: 20px;
	}
	.snail_list_box_three_left{
	    flex:1;
	    font-size: 12px;
	    color:#666;
	    line-height: 20px;
		color:#999;
	}
	.snail_list_box_three_right{
	    min-width:80px;
	    color:red;
	    font-weight: bold;
	    text-align: right;
	    position: relative;
	}
	.snail_list_box_three_right_text{
	    width: 78%;
	    height: 25px;
	    text-align: center;
	    border: 1px solid red;
	    border-radius: 21px;
	    line-height: 25px;
	    font-weight: 500;
	    font-size: 16px;
	    position: absolute;
	    right: 0;
	    top: 0;
	}
	.snail_list_box_three_right_text1{
	    width: 78%;
	    height: 80%;
	    text-align: center;
	    /* border: 1px solid red; */
	    border-radius: 21px;
	    line-height: 24px;
	    font-weight: 500;
	    font-size: 16px;
	    position: absolute;
	    right: 0;
	    top: 0;
	}
	.snail_list_box_three_right_text1 img{
	    width:100px;
	    position: absolute;
	    right:0px;
	    bottom:0px;
	}
	.snail_list_box_three_right_text_color1{
	    color:red;
	    border: 1px solid red;
	}
	.snail_list_box_three_right_text_color2{
	    color:#FF5400;
	    border: 1px solid #FF5400;
	}
	.snail_list_box_three_right_text_color3{
	    color:#57CE00;
	    border: 1px solid #57CE00;
	}
	.snail_list_box_three_right_text_color4{
	    color:#333;
	    border: 1px solid #333;
	}
	.loading{
	       line-height: 2em;
	       text-align: center;
	       color: #888;
	       margin-top: 30rpx;
	   }
</style>
