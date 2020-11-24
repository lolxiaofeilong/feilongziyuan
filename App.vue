<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS
		// 检测升级
		uni.request({
		    url: 'http://139.155.90.219:3000/checkVersion', //检查更新的服务器地址
		    data: {
		        // appid: plus.runtime.appid,
		        // version: plus.runtime.version,
		    },
		    success: (res) => {
				console.log(11111111111111,plus.runtime.appid);
				console.log(1111111111111,plus.runtime.version);
				console.log(1111111111111,plus.os.name);
				// console.log(res);
		        if (res.statusCode == 200 &&  plus.runtime.version != res.data[0].lastVersion) {
		            // let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
					if(plus.os.name == 'Android'){
						// 提醒用户更新
						uni.showModal({ 
							title: '更新提示',
							// content: '当前版本：'+plus.runtime.version+'最新版本:'+res.data[0].lastVersion+",<---"+res.data[0].content+'--->是否选择更新',
							content: res.data[0].content,
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(res.data[0].downloadUrl);
									// plus.runtime.openURL("http://139.155.90.219:1000"); 
								}
							}
						})
					}else{
						// 提醒用户更新
						uni.showModal({ 
							title: '更新提示',
							// content: '当前版本：'+plus.runtime.version+'最新版本:'+res.data[0].lastVersion+",<---"+res.data[0].content+'--->是否选择更新',
							content: res.data[0].content,
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(res.data[0].ios);
									// plus.runtime.openURL("http://139.155.90.219:1000"); 
								}
							}
						})
					}
		        }
		    }
		})
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style> 
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
@font-face {  
	  font-family: 'big'; 
	  src: url('@/static/big.ttf');  
	  font-weight: normal;  
	  font-style: normal;  
	}
view {
		font-size: 14px;
		line-height: inherit;
	}
</style>
