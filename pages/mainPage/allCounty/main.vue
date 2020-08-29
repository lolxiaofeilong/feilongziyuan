<template>
	<view>
		<view class="main">
			<view class="main_item" v-for="(item,idx) in city" :key="idx" @click="seeDetail(item)">
				<view class="main_item_img">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="main_item_txt">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:[
					{
						name:"主城区",
						src: "../../../static/icon/1.jpg",
					},
					{
						name:"盘龙街道",
						src: "../../../static/icon/2.jpg"
					},
					{
						name:"人和街道",
						src: "../../../static/icon/3.jpg"
					},
					{
						name:"江口镇",
						src: "../../../static/icon/4.jpg"
					},
					{
						name:"南溪镇",
						src: "../../../static/icon/5.jpg"
					},
					{
						name:"凤鸣镇",
						src: "../../../static/icon/6.jpg"
					},
					{
						name:"高阳镇",
						src: "../../../static/icon/7.jpg"
					},
					{
						name:"平安镇",
						src: "../../../static/icon/8.jpg"
					},
					{
						name:"红狮镇",
						src: "../../../static/icon/9.jpg"
					},
					{
						name:"故陵镇",
						src: "../../../static/icon/10.jpg"
					},
					{
						name:"龙角镇",
						src: "../../../static/icon/11.jpg"
					},
					{
						name:"沙市镇",
						src: "../../../static/icon/12.jpg"
					},
					{
						name:"栖霞镇",
						src: "../../../static/icon/13.jpg"
					},
					{
						name:"黄石镇",
						src: "../../../static/icon/14.jpg"
					},
					{
						name:"巴阳镇",
						src: "../../../static/icon/15.jpg"
					},
					{
						name:"渠马镇",
						src: "../../../static/icon/16.jpg"
					},
					{
						name:"双土镇",
						src: "../../../static/icon/17.jpg"
					},
					{
						name:"路阳镇",
						src: "../../../static/icon/18.jpg"
					},
					{
						name:"鱼泉镇",
						src: "../../../static/icon/19.jpg"
					},
					{
						name:"宝坪镇",
						src: "../../../static/icon/20.jpg"
					},
					{
						name:"农坝镇",
						src: "../../../static/icon/21.jpg"
					},
					{
						name:"桑坪镇",
						src: "../../../static/icon/22.jpg"
					},
					{
						name:"云阳镇",
						src: "../../../static/icon/23.jpg"
					},
					{
						name:"云安镇",
						src: "../../../static/icon/24.jpg"
					},
					{
						name:"双龙镇",
						src: "../../../static/icon/25.jpg"
					},
					{
						name:"清水乡",
						src: "../../../static/icon/26.jpg"
					},
					{
						name:"水口镇",
						src: "../../../static/icon/27.jpg"
					},
					{
						name:"蔈草镇",
						src: "../../../static/icon/28.jpg"
					},
					{
						name:"泥溪镇",
						src: "../../../static/icon/29.jpg"
					},
					{
						name:"养鹿镇",
						src: "../../../static/icon/30.jpg"
					},
					{
						name:"后叶镇",
						src: "../../../static/icon/31.jpg"
					},
					{
						name:"龙洞镇",
						src: "../../../static/icon/32.jpg"
					},
					{
						name:"堰坪镇",
						src: "../../../static/icon/33.jpg"
					},
					{
						name:"大阳镇",
						src: "../../../static/icon/34.jpg"
					},
					{
						name:"耀灵镇",
						src: "../../../static/icon/35.jpg"
					},
					{
						name:"洞鹿镇",
						src: "../../../static/icon/36.jpg"
					},
					{
						name:"上坝乡",
						src: "../../../static/icon/37.jpg"
					},
					{
						name:"新津乡",
						src: "../../../static/icon/38.jpg"
					},
					{
						name:"普安乡",
						src: "../../../static/icon/39.jpg"
					},
					{
						name:"石门乡",
						src: "../../../static/icon/40.jpg"
					},
					{
						name:"外郎乡",
						src: "../../../static/icon/41.jpg"
					}
				 ],
				 page:"countyDetail"
			}
		},
		methods: {
			seeDetail(item){
				 console.log(1111111111)
				 uni.navigateTo({
					 url: this.page+"?city="+item.name
				 });
			},
		}
	}
</script>

<style scoped>
	.main{
		/* height:300rpx; */
		/* background-color: red; */
		overflow-y:scroll;
		display: flex;
		flex-wrap: wrap;
		margin:20rpx 0;
	}
	.main_item{
		width:20%;
		height: 200rpx;
		text-align: center;
	}
	.main_item_img{
		/* width:100%; */
		/* height: 70%; */
	}
	.main_item_txt{
	}
	.main_item_img image{
		width:100rpx;
		height:100rpx;
		border-radius: 50%;
	}
</style>
