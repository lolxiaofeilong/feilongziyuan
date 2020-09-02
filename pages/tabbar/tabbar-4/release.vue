<template>
	<view class="box">
		<view class="release_title"> 标题：</view>
		<input type="text" v-model="OrderTitle" placeholder="请输入标题" />
		<view class="release_title"> 任务奖励：</view>
		<input type="text" v-model="OrderAmount" placeholder="请输入任务奖励" />
		<view class="release_title"> 联系人：</view>
		<input type="text" v-model="ReleaseName" placeholder="请输入联系人" />
		<view class="release_title"> 联系电话：</view>
		<input type="text" v-model="phone" placeholder="请输入联系电话" />
		<view class="release_title"> 截止日期：</view>
		<view class="time" @click="open">{{deadTime}}</view>
		<uni-calendar ref="calendar" :clear-date="true" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range" @confirm="confirm" @close="close" />
		<view class="release_title"> 具体内容：</view>
		<textarea v-model="OrderContent" placeholder="请输入具体内容" maxlength="-1" auto-height />
		
		<view class="btn">
			<button type="primary" @click="addData">发布消息</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderTitle:"",
				OrderAmount:"",
				OrderContent:"",
				phone:"",
				Status:2,
				ReleaseName:"",
				deadTime:"请选择日期",
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		methods: {
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			}, 
			confirm(e) {
				console.log('confirm 返回:', e)
				this.deadTime = e.fulldate
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			addData() {
				var me = this;
				if(!this.OrderTitle){
					uni.showToast({
					    title: '请填写标题',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				if(!this.OrderAmount){
					uni.showToast({
					    title: '请填写任务奖励',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				if(!this.ReleaseName){
					uni.showToast({
					    title: '请填写联系人',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				if(!this.phone){
					uni.showToast({
					    title: '请填写联系电话',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				if(this.deadTime.length<8){
					uni.showToast({
					    title: '请选择截止日期',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				if(!this.OrderContent){
					uni.showToast({
					    title: '请填写具体内容',
					    duration: 2000,
						icon:"none"
					});
					return false ;
				}
				var username = uni.getStorageSync('username');
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
				 url:"http://139.155.90.219:3000/addHelps_new"+`?OrderTitle=${this.OrderTitle}&
																OrderAmount=${this.OrderAmount}&
																OrderContent=${this.OrderContent}&
																Status=${this.Status}&
																ReleaseName=${this.ReleaseName}&
																deadTime=${this.deadTime}&
																username=${username}&
																phone=${this.phone}
																`,
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
						},500)
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
		}
	}
</script>

<style>
	.bigBox{
		display: flex;
		flex-direction: column;
	}
	.box{
		text-indent: 20px;
	}
	.btn{
		/* width: 100%; */
		/* height: 50px; */
		/* position: absolute; */
		/* left:0; */
		/* bottom: 0; */
		flex:1;
		padding-top:50px;
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
	.time{
		height: 30px;
		border-bottom:1px solid #ccc;
	}
	textarea{		
		min-height: 50px;
		border-bottom:1px solid #ccc;
		width: 100%;
	}
</style>
