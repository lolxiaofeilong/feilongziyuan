<template>
    <uni-list>
    	<uni-list-item v-for="(item,idx) in list" :key="idx" :title="item.name" @click="onclick(item.link)" :thumb="item.icon" />
    </uni-list>
</template>


<script>
	export default {
		data() {
			return {
				list:[
					// {
					// 	name:"公告栏",
					// 	icon:"http://139.155.90.219:1000/icon/panshi.png",
					// 	link:"./news"
					// },
					// {
					// 	name:"镇上资源",
					// 	icon:"http://139.155.90.219:1000/icon/panshi.png",
					// 	link:"../../mainPage/allCounty/countyDetail"
					// },
					// {
					// 	name:"摩托车",
					// 	icon:"http://139.155.90.219:1000/icon/panshi.png",
					// 	link:"./motorbike"
					// },
				]
			}
		},
		onLoad(options) {
			this.place = options.name;
			console.log(this.place)
		},
		methods: {
			onclick(link){
				console.log(link);
				uni.navigateTo({
					url: link+"?city="+this.place
				});
			},
			getList(){
				var me = this;
				uni.showLoading({
				    title: '加载中...',
					mask:true
				});
				uni.request({
					url: "http://139.155.90.219:3000/getList",
					data: {},
					header: {},
					success(response) {
						me.list = response.data;
					},
					fail: (e) => {
						uni.showToast({
							title: '网络异常...',
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
		mounted() {
			this.getList()
		}
	}
</script>

<style>

</style>
