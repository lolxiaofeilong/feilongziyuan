<template>
	<view>
		<input type="text" v-model="username" placeholder="请输入您的账号" />
		
		<view class="" v-if="!!question">
			<view class="" style="color:red;">
				问题：{{question}}
			</view>
			<input type="text" v-model="answer" placeholder="请填写答案" />
		</view>
		
		<button type="primary" @click="addQuestion">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				question:"",
				answer_fuwuqi:"",
				answer:"",
				password:""
			}
		},
		methods: {
			addQuestion(){
				var me = this;
				// 如果密码不存在
				if(!this.question){
					if(!this.username){
						uni.showToast({
						    title: '请输入账号',
						    duration: 2000,
							icon:"none"
						});
						return false;
					}
					uni.showLoading({
					    title: '加载中...',
						mask:true
					});
					
					uni.request({
						url: "http://139.155.90.219:3000/getquestion"+ `?account=${this.username}`,
						data: {},
						header: {},
						success(response) {
							console.log(response.data);
							me.question = response.data[0].question;
							me.answer_fuwuqi = response.data[0].answer;
							me.password = response.data[0].password;
						},
						fail: (e) => {
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
				}else{
					if(this.answer==this.answer_fuwuqi){
						uni.showModal({
							title: '您的密码是',
							content: this.password,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}else{
						uni.showToast({
						    title: '密保答案不对额',
						    duration: 2000,
							icon:"none"
						});
					}
				}
				
			}
		}
	}
</script>

<style scoped>
	input {
		height: 50px;
		border-bottom: 1px solid #f2f2f2;
	}
</style>
