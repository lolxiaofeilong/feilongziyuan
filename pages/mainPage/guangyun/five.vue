<template>
	<view>
		<!-- 有的模板-----标题显示不一样 -->
		<view class="hello">
			<!-- 防止截图这个不消失，所以写在了当前页面 -->
			<button type="primary" @click="goBack" style="height: 100px;line-height: 100px;">返回</button>
			<view class="base">
				<view class="item">
					第一字：
					<input type="text" v-model="firstWord">
				</view>
				<view class="item">
					第二字：
					<input type="text" v-model="secondWord">
				</view>
				<view class="item">
					多少行：
					<input type="number" v-model="hang">
				</view>
				<view class="item">
					多少列：
					<input type="number" v-model="lie">
				</view>
				<view class="item">
					格子宽：
					<input type="text" v-model="kuan" placeholder="单位px">
				</view>
				<view class="item">
					格子高：
					<input type="text" v-model="gao" placeholder="单位px">
				</view>
				<view class="item">
					外边距：
					<input type="text" v-model="waibianju" placeholder="单位px">
				</view>
				<view class="item">
					内边距：
					<input type="text" v-model="neibianju" placeholder="单位px">
				</view>
				<view class="item">
					字大小：
					<input type="text" v-model="fontsize" placeholder="单位px">
				</view>
				<view class="item">
					标题高：
					<input type="text" v-model="biaotigao" placeholder="单位px">
				</view>

				<!-- <view class="item">
		        字颜色：
		        <input type="color"  v-model="fontcolor">
		      </view>
		
		      <view class="item">
		        标题色：
		        <input type="color"  v-model="biaotise">
		      </view>
		      <view class="item">
		        格上色：
		        <input type="color"  v-model="geshangse">
		      </view>
		      <view class="item">
		        格下色：
		        <input type="color"  v-model="gexiase">
		      </view>
		      <view class="item">
		        背景色：
		        <input type="color"  v-model="bgcolor">
		      </view> -->
				<view class="item">
					<!-- 字颜色： -->
					<!-- <input type="color" v-model="fontcolor"> -->

					字颜色：
					<button class="button" @click="open" :style="{backgroundColor:'rgba('+fontcolor.r+','+fontcolor.g+','+fontcolor.b+','+fontcolor.a+')'}">
					</button>
					<!-- 需要声明 ref  -->
					<t-color-picker ref="colorPicker" :color="fontcolor" @confirm="confirm"></t-color-picker>
				</view>

				<view class="item">
					<!-- 标题色：
			  	<input type="color" v-model="biaotise"> -->
					标题色：
					<!-- <input type="color" v-model="biaotise"> -->
					<button class="button" @click="open1" :style="{backgroundColor:'rgba('+biaotise.r+','+biaotise.g+','+biaotise.b+','+biaotise.a+')'}">
					</button>
					<!-- 需要声明 ref  -->
					<t-color-picker ref="colorPicker1" :color="biaotise" @confirm="confirm1"></t-color-picker>
				</view>
				<view class="item">
					<!-- 	格上色：
			  	<input type="color" v-model="geshangse"> -->
					格上色：
					<!-- <input type="color" v-model="geshangse"> -->
					<button class="button" @click="open2" :style="{backgroundColor:'rgba('+geshangse.r+','+geshangse.g+','+geshangse.b+','+geshangse.a+')'}">
					</button>
					<!-- 需要声明 ref  -->
					<t-color-picker ref="colorPicker2" :color="geshangse" @confirm="confirm2"></t-color-picker>
				</view>
				<view class="item">
					<!-- 格下色：
			  	<input type="color" v-model="gexiase"> -->
					格下色：
					<!-- <input type="color" v-model="gexiase"> -->
					<button class="button" @click="open3" :style="{backgroundColor:'rgba('+gexiase.r+','+gexiase.g+','+gexiase.b+','+gexiase.a+')'}">
					</button>
					<!-- 需要声明 ref  -->
					<t-color-picker ref="colorPicker3" :color="gexiase" @confirm="confirm3"></t-color-picker>
				</view>
				<view class="item">
					<!-- 背景色：
			  	<input type="color" v-model="bgcolor"> -->
					背景色：
					<!-- <input type="color" v-model="bgcolor"> -->
					<button class="button" @click="open4" :style="{backgroundColor:'rgba('+bgcolor.r+','+bgcolor.g+','+bgcolor.b+','+bgcolor.a+')'}">
					</button>
					<!-- 需要声明 ref  -->
					<t-color-picker ref="colorPicker4" :color="bgcolor" @confirm="confirm4"></t-color-picker>
				</view>
				<view class="item">
					格旋转：
					<input type="text" v-model="tdxuanzhuan">
				</view>
				<view class="item">
					字旋转：
					<input type="text" v-model="d3xuanzhuan">
				</view>
				<view class="item">
					小格高：
					<input type="text" v-model="d2height">
				</view>
				<view class="item" style="color:red">
					等级一：
					<input type="text" v-model="level1">
				</view>
				<view class="item">
					一级数：
					<input type="text" v-model="level1_value">
				</view>
				<view class="item">
					等级二：
					<input type="text" v-model="level2">
				</view>
				<view class="item">
					二级数：
					<input type="text" v-model="level2_value">
				</view>
				<view class="item">
					等级三：
					<input type="text" v-model="level3">
				</view>
				<view class="item">
					三级数：
					<input type="text" v-model="level3_value">
				</view>
				<view class="item">
					等级四：
					<input type="text" v-model="level4">
				</view>
				<view class="item">
					四级数：
					<input type="text" v-model="level4_value">
				</view>
				<view class="item">
					等级五：
					<input type="text" v-model="level5">
				</view>
				<view class="item">
					五级数：
					<input type="text" v-model="level5_value">
				</view>
				<view class="item">
					等级六：
					<input type="text" v-model="level6">
				</view>
				<view class="item">
					六级数：
					<input type="text" v-model="level6_value">
				</view>
				<view class="item">
					等级色：
					<input type="color" v-model="dengjicolor">
				</view>
				<view class="item">
					等级字：
					<input type="text" v-model="dengjifontsize">
				</view>
				<view class="item">
					不同数：
					<input type="text" v-model="butongshu">
				</view>
				<view class="item" style="color:skyblue;">
					中间宽：
					<input type="text" v-model="zhongjiankuan1">
				</view>
				<view class="item" style="color:skyblue;">
					中间高：
					<input type="text" v-model="zhongjiangao1">
				</view>
			</view>
			<view>
				标题：<input type="text" v-model="biaoti" style="width:200px">
			</view>

			<view class="control">
				<button id="btn" @click="btnclick">手动生成文字</button>
				<button id="btn1" @click="btn1click">随机生成文字</button>
				<button id="btn2" @click="btn2click">随机生成图标1</button>
				<button id="btn3" @click="btn3click">随机生成图标2</button>
			</view>

			<view class="item"></view>
			<!--  <view class="erwai">
		      <h4>数据生成之后------控制径向渐变效果：</h4>
		      <input type="color" id="jian1"/>
		      <input type="color" id="jian2"/>
		      <input type="color" id="jian3"/>
		      <input type="button"id="btnjianbian" value="确定"/>
		    </view>-->
			<view class="content" id="content" :style="{background:bgcolor}" @click="changebgcolor">
				<h3 :style="{color:biaotise,height:biaotigao}">{{biaoti}}</h3>
				<!-- <h3 :style="{color:biaotise,height:biaotigao}">个</h3> -->
				<view>
					<table id="output" cellspacing="0" cellpading="0">
						<tr v-for="(item, idx) in table_data" :key="idx">
							<td v-for="(item1, idx1) in item" :key="idx1" :style="{width:kuan,height:gao,transform: ('rotateZ('+tdxuanzhuan+'deg)')}">
								<!-- <td v-for="(item1, idx1) in item" :key="idx1" :style="{width:kuan,height:gao,transform: rotateZ('45deg')}"> -->
								<view class="xx" :style="{margin:waibianju,padding:neibianju,fontSize:fontsize,width:kuan,height:gao,lineHeight:gao}">
									<view class="d1" :style="{background:gexiase}">
										<view class="d2" :style="{background:geshangse,width:zhongjiankuan1,height:zhongjiangao1}"></view>
										<view class="d3" :style="{color:fontcolor,transform: ('rotateZ('+d3xuanzhuan+'deg)'),fontSize:fontsize}">{{item1}}</view>
									</view>
								</view>
							</td>
						</tr>
					</table>
					<table id="output1" cellspacing="0" cellpading="0">
						<tr v-for="(item, idx) in table_data1" :key="idx">
							<td v-for="(item1, idx1) in item" :key="idx1" :style="{width:kuan,height:gao}">
								<view class="xx" :style="{margin:waibianju,padding:neibianju,fontSize:fontsize,width:kuan,height:gao,lineHeight:gao,background:item1.color}">
									{{item1.zi}}
								</view>
							</td>
						</tr>
					</table>
					<view>
						<view class="level" v-for="(item, idx) in level" :key="idx" :style="{color:dengjicolor,fontSize:dengjifontsize}">{{item.text}}：{{item.value}}个</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconData: this.returnIcon(),
				firstWord: uni.getStorageSync("firstWord6") || "胡",
				secondWord: uni.getStorageSync("secondWord6") || "广",
				hang: uni.getStorageSync("hang6") || 10,
				lie: uni.getStorageSync("lie6") || 10,
				kuan: uni.getStorageSync("kuan6") || "20px",
				gao: uni.getStorageSync("gao6") || "20px",
				waibianju: uni.getStorageSync("waibianju6") || "3px",
				neibianju: uni.getStorageSync("neibianju6") || "3px",
				fontsize: uni.getStorageSync("fontsize6") || "12px",
				biaotigao: uni.getStorageSync("biaotigao6") || "40px",

				biaoti: uni.getStorageSync("biaoti6") || "从1中找2",
				table_data: [],
				table_data1: [],
				tdxuanzhuan: uni.getStorageSync("tdxuanzhuan6") || 270,
				d3xuanzhuan: uni.getStorageSync("d3xuanzhuan6") || -270,
				d2height: uni.getStorageSync("d2height6") || 33,
				level1: uni.getStorageSync("level16") || "青铜",
				level1_value: uni.getStorageSync("level1_value6") || "1",
				level2: uni.getStorageSync("level26") || "白银",
				level2_value: uni.getStorageSync("level2_value6") || "2",
				level3: uni.getStorageSync("level36") || "黄金",
				level3_value: uni.getStorageSync("level3_value6") || "3",
				level4: uni.getStorageSync("level46") || "铂金",
				level4_value: uni.getStorageSync("level4_value6") || "4",
				level5: uni.getStorageSync("level56") || "大师",
				level5_value: uni.getStorageSync("level5_value6") || "5",
				level6: uni.getStorageSync("level66") || "王者",
				level6_value: uni.getStorageSync("level6_value6") || "6",
				level: [],
				dengjifontsize: uni.getStorageSync("dengjifontsize6") || "20px",
				butongshu: uni.getStorageSync("butongshu6") || 5,
				zhongjiankuan1: uni.getStorageSync("zhongjiankuan1") || '16px',
				zhongjiangao1: uni.getStorageSync("zhongjiangao1") || '16px',



				dengjicolor: uni.getStorageSync("dengjicolor6") || "#550000",
				// fontcolor:uni.getStorageSync("fontcolor6") || "#ff0000",
				// biaotise:uni.getStorageSync("biaotise6") || "#ff9900",
				// geshangse:uni.getStorageSync("geshangse6") || "#FFC169",
				// gexiase:uni.getStorageSync("gexiase6") || "#F87C0D",
				// bgcolor:uni.getStorageSync("bgcolor6") || "#606000",
				fontcolor: uni.getStorageSync("fontcolor6") ? JSON.parse(uni.getStorageSync("fontcolor6")) : {
					r: 255,
					g: 60,
					b: 90,
					a: 0.6
				},
				biaotise: uni.getStorageSync("biaotise6") ? JSON.parse(uni.getStorageSync("biaotise6")) : {
					r: 255,
					g: 100,
					b: 0,
					a: 0.6
				},
				geshangse: uni.getStorageSync("geshangse6") ? JSON.parse(uni.getStorageSync("geshangse6")) : {
					r: 255,
					g: 0,
					b: 100,
					a: 0.6
				},
				gexiase: uni.getStorageSync("gexiase6") ? JSON.parse(uni.getStorageSync("gexiase6")) : {
					r: 55,
					g: 100,
					b: 0,
					a: 0.6
				},
				bgcolor: uni.getStorageSync("bgcolor6") ? JSON.parse(uni.getStorageSync("bgcolor6")) : {
					r: 155,
					g: 0,
					b: 0,
					a: 0.6
				},
			}
		},
		watch: {
			// 将数据保存下来
			level1() {
				uni.setStorageSync("level16", this.level1);
			},
			level1_value() {
				uni.setStorageSync("level1_value6", this.level1_value);
			},
			level2() {
				uni.setStorageSync("level26", this.level2);
			},
			level2_value() {
				uni.setStorageSync("level2_value6", this.level2_value);
			},
			level3() {
				uni.setStorageSync("level36", this.level3);
			},
			level3_value() {
				uni.setStorageSync("level3_value6", this.level3_value);
			},
			level4() {
				uni.setStorageSync("level46", this.level4);
			},
			level4_value() {
				uni.setStorageSync("level4_value6", this.level4_value);
			},
			level5() {
				uni.setStorageSync("level56", this.level5);
			},
			level5_value() {
				uni.setStorageSync("level5_value6", this.level5_value);
			},
			level6() {
				uni.setStorageSync("level66", this.level6);
			},
			level6_value() {
				uni.setStorageSync("level6_value6", this.level6_value);
			},
			dengjicolor() {
				uni.setStorageSync("dengjicolor6", this.dengjicolor);
			},
			dengjifontsize() {
				uni.setStorageSync("dengjifontsize6", this.dengjifontsize);
			},
			butongshu() {
				uni.setStorageSync("butongshu6", this.butongshu);
			},
			zhongjiankuan1() {
				uni.setStorageSync("zhongjiankuan1", this.zhongjiankuan1);
			},
			zhongjiangao1() {
				uni.setStorageSync("zhongjiangao1", this.zhongjiangao1);
			},











			d2height() {
				uni.setStorageSync("d2height6", this.d2height);
			},
			firstWord() {
				uni.setStorageSync("firstWord6", this.firstWord);
			},
			tdxuanzhuan() {
				uni.setStorageSync("tdxuanzhuan6", this.tdxuanzhuan);
			},
			d3xuanzhuan() {
				uni.setStorageSync("d3xuanzhuan6", this.d3xuanzhuan);
			},
			bgcolor() {
				uni.setStorageSync("bgcolor6", JSON.stringify(this.bgcolor));
			},
			biaoti() {
				uni.setStorageSync("biaoti6", this.biaoti);
			},
			geshangse() {
				uni.setStorageSync("geshangse6", JSON.stringify(this.geshangse));
			},
			gexiase() {
				uni.setStorageSync("gexiase6", JSON.stringify(this.gexiase));
			},
			fontcolor() {
				uni.setStorageSync("fontcolor6", JSON.stringify(this.fontcolor));
			},
			biaotise() {
				uni.setStorageSync("biaotise6", JSON.stringify(this.biaotise));
			},
			fontsize() {
				uni.setStorageSync("fontsize6", this.fontsize);
			},
			biaotigao() {
				uni.setStorageSync("biaotigao6", this.biaotigao);
			},
			neibianju() {
				uni.setStorageSync("neibianju6", this.neibianju);
			},
			waibianju() {
				uni.setStorageSync("waibianju6", this.waibianju);
			},
			secondWord() {
				uni.setStorageSync("secondWord6", this.secondWord);
			},
			hang() {
				uni.setStorageSync("hang6", this.hang);
			},
			lie() {
				uni.setStorageSync("lie6", this.lie);
			},
			kuan() {
				uni.setStorageSync("kuan6", this.kuan);
			},
			gao() {
				uni.setStorageSync("gao6", this.gao);
			},

		},
		methods: {
			// 字的颜色
			open(item) {
				// 打开颜色选择器
				this.$refs.colorPicker.open();
			},
			confirm(e) {
				this.fontcolor = e.rgba
			},
			// 标题的颜色
			open1(item) {
				// 打开颜色选择器
				this.$refs.colorPicker1.open();
			},
			confirm1(e) {
				this.biaotise = e.rgba
			},
			// 标题的颜色
			open2(item) {
				// 打开颜色选择器
				this.$refs.colorPicker2.open();
			},
			confirm2(e) {
				this.geshangse = e.rgba
			},
			// 标题的颜色
			open3(item) {
				// 打开颜色选择器
				this.$refs.colorPicker3.open();
			},
			confirm3(e) {
				this.gexiase = e.rgba
			},
			// 标题的颜色
			open4(item) {
				// 打开颜色选择器
				this.$refs.colorPicker4.open();
			},
			confirm4(e) {
				this.bgcolor = e.rgba
			},



			// 根据用户设置的等级生成等级数据
			renderlevel() {
				this.level = [];
				for (var i = 1; i < 7; i++) {
					var x = "level" + i;
					var y = "level" + i + "_value";
					if (this[x] && this[y]) {
						var obj = {};
						obj.text = this[x];
						obj.value = this[y];
						this.level.push(obj);
					}
				}
				console.log("this.level", this.level)
			},
			changebgcolor() {
				this.bgcolor = this.randomColor();
			},
			goBack() {
				uni.navigateBack()
			},
			// 生成随机数
			randomNumber(min, max) {
				return parseInt(Math.random() * (max - min + 1)) + min;
			},
			randomColor() {
				var str = "0123456789abcdef";
				var color = "#";
				for (var i = 0; i < 6; i++) {
					// 随机获取一个字符
					var idx = parseInt(Math.random() * str.length);
					color += str[idx];
				}
				return color;
			},
			suijizi() {
				var x = this.randomNumber(20000, 40000);
				var str = "%u" + x.toString(16);
				return unescape(str);
			},
			suijitubiao() {
				var random1 = this.randomNumber(55356, 55358);
				var random2 = this.randomNumber(56320, 57343);
				var random3 = this.randomNumber(8205, 65039);
				// console.log(random1,random2,random3)
				var str1 = "%u" + random1.toString(16);
				var str2 = "%u" + random2.toString(16);
				var str3 = "%u" + random3.toString(16);
				// console.log("str1",str1)
				// console.log("str2",str2)
				// console.log("str3",str3)
				// var str = str1+str2;
				var str = "%ud83d" + str2;
				// console.log("你最终得到的东西",str)
				// console.log("你最终得到的东西",unescape(str))
				output.innerHTML = unescape(str);
				return unescape(str);
			},

			btnclick() {
				this.renderlevel()
				// 先清空
				this.table_data = [];
				this.table_data1 = [];
				// 根据输入的行和列生成数据
				for (var i = 0; i < this.hang; i++) {
					var data = []
					for (var j = 0; j < this.lie; j++) {
						data.push(this.firstWord);
					}
					this.table_data.push(data)
				}
				var data_record = [];
				// 生成5个不同的随机数,生成5倍数量的随机数，然后去重，再去前n个
				for (var x = 0; x < this.butongshu * 5; x++) {
					var suijishu = this.randomNumber(0, this.hang * this.lie - 1);
					data_record.push(suijishu);
				}

				function unique(arr) {
					return Array.from(new Set(arr))
				}
				var newdata = unique(data_record);
				for (var a = 0; a < this.butongshu; a++) {
					var quzheng = parseInt(newdata[a] / this.lie);
					var quyu = newdata[a] % this.lie;
					this.table_data[quzheng][quyu] = this.secondWord;
				}
				console.log(this.table_data)
				this.biaoti = '从 "' + this.firstWord + '" 中找到 "' + this.secondWord + '"，  你能找到几个？';
				console.log("this.biaoti", this.biaoti)
			},
			btn1click() {
				// 先清空
				this.renderlevel()
				this.table_data = [];
				this.table_data1 = [];
				var first = this.suijizi();
				var second = this.suijizi();
				this.biaoti = '从 "' + first + '" 中找到 "' + second + '" ，  你能找到几个？';
				console.log("this.biaoti", this.biaoti)
				// 根据输入的行和列生成数据
				for (var i = 0; i < this.hang; i++) {
					var data = []
					for (var j = 0; j < this.lie; j++) {
						data.push(first);
					}
					this.table_data.push(data)
				}
				var data_record = [];
				// 生成5个不同的随机数,生成5倍数量的随机数，然后去重，再去前n个
				for (var x = 0; x < this.butongshu * 5; x++) {
					var suijishu = this.randomNumber(0, this.hang * this.lie - 1);
					data_record.push(suijishu);
				}

				function unique(arr) {
					return Array.from(new Set(arr))
				}
				var newdata = unique(data_record);
				for (var a = 0; a < this.butongshu; a++) {
					var quzheng = parseInt(newdata[a] / this.lie);
					var quyu = newdata[a] % this.lie;
					this.table_data[quzheng][quyu] = second;
				}
				console.log(this.table_data)
			},
			btn3click() {
				this.renderlevel()
				var zi1 = unescape(this.iconData[this.randomNumber(0, 490)]);
				var zi2 = unescape(this.iconData[this.randomNumber(0, 490)]);
				if (zi1 == zi2) {
					zi2 = unescape(this.iconData[this.randomNumber(0, 490)]);
				}
				this.biaoti = '从 "' + zi1 + '" 中找到 "' + zi2 + '"，  你能找到几个？';
				// 先清空
				this.table_data1 = [];
				this.table_data = [];
				// 根据输入的行和列生成数据
				for (var i = 0; i < this.hang; i++) {
					var data = []
					for (var j = 0; j < this.lie; j++) {
						data.push(zi1);
					}
					this.table_data.push(data)
				}
				var data_record = [];
				// 生成5个不同的随机数,生成5倍数量的随机数，然后去重，再去前n个
				for (var x = 0; x < this.butongshu * 5; x++) {
					var suijishu = this.randomNumber(0, this.hang * this.lie - 1);
					data_record.push(suijishu);
				}

				function unique(arr) {
					return Array.from(new Set(arr))
				}
				var newdata = unique(data_record);
				for (var a = 0; a < this.butongshu; a++) {
					var quzheng = parseInt(newdata[a] / this.lie);
					var quyu = newdata[a] % this.lie;
					this.table_data[quzheng][quyu] = zi2;
				}
			},
			btn2click() {
				var zi1 = unescape(this.iconData[this.randomNumber(0, 490)]);
				var zi2 = unescape(this.iconData[this.randomNumber(0, 490)]);
				if (zi1 == zi2) {
					zi2 = unescape(this.iconData[this.randomNumber(0, 490)]);
				}
				this.biaoti = '从 "' + zi1 + '" 中找到 "' + zi2 + '"';
				// 先清空
				this.table_data = [];
				this.table_data1 = [];
				var first = this.suijizi();
				var second = this.suijizi();
				// 根据输入的行和列生成数据
				for (var i = 0; i < this.hang; i++) {
					var data = []
					for (var j = 0; j < this.lie; j++) {
						var obj = {};
						obj.zi = zi1;
						obj.color = this.randomColor();
						data.push(obj);
					}
					this.table_data1.push(data)
				}
				var suijishu = this.randomNumber(0, this.hang * this.lie - 1);
				var quzheng = parseInt(suijishu / this.lie);
				var quyu = suijishu % this.lie;
				this.table_data[quzheng][quyu] = zi2;
				console.log(this.table_data1)

			},
			contentonclick() {
				content.style.backgroundColor = this.randomColor();
			},
			coloruponchange() {
				console.log(colorup.value);
				var d2 = document.getElementsByClassName("d2");
				for (var i = 0; i < d2.length; i++) {
					console.log(d2[i]);
					d2[i].style.backgroundColor = colorup.value;
				}
			},
			colordownonchange() {
				console.log(colordown.value);
				var d1 = document.getElementsByClassName("d1");

				for (var i = 0; i < d1.length; i++) {
					console.log(d1[i]);
					d1[i].style.backgroundColor = colordown.value;
				}
			},

			returnIcon() {
				var str1 = "🌹🍀🍎💰📱🌙🍁🍂🍃🌷💎🔪🔫🏀⚽⚡👄👍🔥";
				var str2 =
					"😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚☺😇😐😑😶😏😣😥😮😯😪😫😴😌😛😜😝😒😓😔😕😲😷😖😞😟😤😢😭😦😧😨😬😰😱😳😵😡😠";
				var str3 =
					"👦👧👨👩👴👵👶👱👮👲👳👷👸💂🎅👰👼💆💇🙍🙎🙅🙆💁🙋🙇🙌🙏👤👥🚶🏃👯💃👫👬👭💏💑👪";
				var str4 = "💪👈👉☝👆👇✌✋👌👍👎✊👊👋👏👐✍";
				var str5 =
					"👣👀👂👃👅👄💋👓👔👕👖👗👘👙👚👛👜👝🎒💼👞👟👠👡👢👑👒🎩🎓💄💅💍🌂";
				var str6 = "📱📲📶📳📴☎📞📟📠";
				var str7 = "♻🏧🚮🚰♿🚹🚺🚻🚼🚾⚠🚸⛔🚫🚳🚭🚯🚱🚷🔞💈";
				var str8 =
					"🙈🙉🙊🐵🐒🐶🐕🐩🐺🐱😺😸😹😻😼😽🙀😿😾🐈🐯🐅🐆🐴🐎🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🐘🐭🐁🐀🐹🐰🐇🐻🐨🐼🐾🐔🐓🐣🐤🐥🐦🐧🐸🐊🐢🐍🐲🐉🐳🐋🐬🐟🐠🐡🐙🐚🐌🐛🐜🐝🐞🦋";
				var str9 = "💐🌸💮🌹🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿🍀🍁🍂🍃";
				var str10 = "🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜☀🌝🌞⭐🌟🌠☁⛅☔⚡❄🔥💧🌊";
				var str11 =
					"🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍅🍆🌽🍄🌰🍞🍖🍗🍔🍟🍕🍳🍲🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍡🍦🍧🍨🍩🍪🎂🍰🍫🍬🍭🍮🍯🍼☕🍵🍶🍷🍸🍹🍺🍻🍴";
				var str12 =
					"🎪🎭🎨🎰🚣🛀🎫🏆⚽⚾🏀🏈🏉🎾🎱🎳⛳🎣🎽🎿🏂🏄🏇🏊🚴🚵🎯🎮🎲🎷🎸🎺🎻🎬";
				var str13 = "😈👿👹👺💀☠👻👽👾💣";
				var str14 =
					"🌋🗻🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪⛲🌁🌃🌆🌇🌉🌌🎠🎡🎢🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚚🚛🚜🚲⛽🚨🚥🚦🚧⚓⛵🚤🚢✈💺🚁🚟🚠🚡🚀🎑🗿🛂🛃🛄🛅";
				var str15 =
					"💌💎🔪💈🚪🚽🚿🛁⌛⏳⌚⏰🎈🎉🎊🎎🎏🎐🎀🎁📯📻📱📲☎📞📟📠🔋🔌💻💽💾💿📀🎥📺📷📹📼🔍🔎🔬🔭📡💡🔦🏮📔📕📖📗📘📙📚📓📃📜📄📰📑🔖💰💴💵💶💷💸💳✉📧📨📩📤📥📦📫📪📬📭📮✏✒📝📁📂📅📆📇📈📉📊📋📌📍📎📏📐✂🔒🔓🔏🔐🔑🔨🔫🔧🔩🔗💉💊🚬🔮🚩🎌💦💨";
				var str16 =
					"♠♥♦♣🀄🎴🔇🔈🔉🔊📢📣💤💢💬💭♨🌀🔔🔕✡✝🔯📛🔰🔱⭕✅☑✔✖❌❎➕➖➗➰➿〽✳✴❇‼⁉❓❔❕❗©®™🎦🔅🔆💯🔠🔡🔢🔣🔤🅰🆎🅱🆑🆒🆓ℹ🆔Ⓜ🆕🆖🅾🆗🅿🆘🆙🆚🈁🈂🈷🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳㊗㊙🈺🈵▪▫◻◼◽◾⬛⬜🔶🔷🔸🔹🔺🔻💠🔲🔳⚪⚫🔴🔵";
				var str17 = "🐁🐂🐅🐇🐉🐍🐎🐐🐒🐓🐕🐖";
				var str18 = "♈♉♊♋♌♍♎♏♐♑♒♓⛎";
				var str19 = "🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦⌛⏳⌚⏰⏱⏲🕰";
				var str20 = "💘❤💓💔💕💖💗💙💚💛💜💝💞💟❣";
				var str21 = "💐🌸💮🌹🌺🌻🌼🌷🌱🌿🍀";
				var str22 = "🌿🍀🍁🍂🍃";
				var str23 = "🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝";
				var str24 = "🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓";
				var str25 = "💴💵💶💷💰💸💳";
				var str26 =
					"🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚚🚛🚜🚲⛽🚨🚥🚦🚧⚓⛵🚣🚤🚢✈💺🚁🚟🚠🚡🚀";
				var str27 = "🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪🌆🌇🌉";
				var str28 =
					"📱📲☎📞📟📠🔋🔌💻💽💾💿📀🎥📺📷📹📼🔍🔎🔬🔭📡📔📕📖📗📘📙📚📓📃📜📄📰📑🔖💳✉📧📨📩📤📥📦📫📪📬📭📮✏✒📝📁📂📅📆📇📈📉📊📋📌📍📎📏📐✂🔒🔓🔏🔐🔑";
				var str29 = "⬆↗➡↘⬇↙⬅↖↕↔↩↪⤴⤵🔃🔄🔙🔚🔛🔜🔝";
				str1 = escape(str1);
				var data = [];
				for (var i = 0; i < str1.length / 12; i++) {
					if (i == 14) {
						var st = str1.slice(i * 12, (i + 1) * 12 - 6);
						data.push(st);
						var st1 = str1.slice(i * 12 + 6, (i + 1) * 12);
						data.push(st1);
						console.log("xx", st, unescape(st));
						console.log("xx", st1, unescape(st1));
					} else {
						var st = str1.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str2 = escape(str2);
				for (var i = 0; i < str2.length / 12; i++) {
					if (i == 16) {
						continue;
					} else if (i > 16) {
						var st = str2.slice(i * 12 - 6, (i + 1) * 12 - 6);
						console.log(i, st, unescape(st));
						data.push(st);
					} else {
						var st = str2.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str3 = escape(str3);
				for (var i = 0; i < str3.length / 12; i++) {
					// if(i==16){
					//     continue
					// }else if(i>16){
					//     var st = str3.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					// else{
					var st = str3.slice(i * 12, (i + 1) * 12);
					console.log(i, st, unescape(st));
					data.push(st);
					// }
				}
				str4 = escape(str4);
				for (var i = 0; i < str4.length / 12; i++) {
					if (
						i == 3 ||
						i == 4 ||
						i == 5 ||
						i == 6 ||
						i == 7 ||
						i == 8 ||
						i == 9
					) {
						continue;
					}
					// else if(i>16){
					//     var st = str4.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					else {
						var st = str4.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str5 = escape(str5);
				for (var i = 0; i < str5.length / 12; i++) {
					// if(i==3||i==4||i==5||i==6||i==7||i==8||i==9){
					//     continue
					// }
					// else if(i>16){
					//     var st = str5.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					// else{
					var st = str5.slice(i * 12, (i + 1) * 12);
					console.log(i, st, unescape(st));
					data.push(st);
					// }
				}
				str6 = escape(str6);
				for (var i = 0; i < str6.length / 12; i++) {
					if (i > 4) {
						continue;
					}
					// else if(i>16){
					//     var st = str6.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					else {
						var st = str6.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str8 = escape(str8);
				for (var i = 0; i < str8.length / 12; i++) {
					// if(i>4){
					//     continue
					// }
					// else if(i>16){
					//     var st = str8.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					// else{
					var st = str8.slice(i * 12, (i + 1) * 12);
					console.log(i, st, unescape(st));
					data.push(st);
					// }
				}
				str9 = escape(str9);
				for (var i = 0; i < str9.length / 12; i++) {
					// if(i>4){
					//     continue
					// }
					// else if(i>16){
					//     var st = str9.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					// else{
					var st = str9.slice(i * 12, (i + 1) * 12);
					console.log(i, st, unescape(st));
					data.push(st);
					// }
				}
				str10 = escape(str10);
				for (var i = 0; i < str10.length / 12; i++) {
					if (i > 15) {
						continue;
					}
					// else if(i>16){
					//     var st = str10.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					else {
						var st = str10.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str11 = escape(str11);
				for (var i = 0; i < str11.length / 12; i++) {
					if (i > 51) {
						continue;
					}
					// else if(i>16){
					//     var st = str11.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					else {
						var st = str11.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str12 = escape(str12);
				for (var i = 0; i < str12.length / 12; i++) {
					if (i == 8 || i > 14) {
						continue;
					} else if (i > 15) {
						var st = str12.slice(i * 12 - 6, (i + 1) * 12 - 6);
						console.log(i, st, unescape(st));
						data.push(st);
					} else {
						var st = str12.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str14 = escape(str14);
				for (var i = 0; i < str14.length / 12; i++) {
					if (i == 8 || i > 14) {
						continue;
					} else if (i > 15) {
						var st = str14.slice(i * 12 - 6, (i + 1) * 12 - 6);
						console.log(i, st, unescape(st));
						data.push(st);
					} else {
						var st = str14.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str15 = escape(str15);
				for (var i = 0; i < str15.length / 12; i++) {
					if (i == 8 || i == 9 || i == 22 || i > 66) {
						continue;
					} else if (i > 22) {
						var st = str15.slice(i * 12 - 6, (i + 1) * 12 - 6);
						console.log(i, st, unescape(st));
						data.push(st);
					} else {
						var st = str15.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str19 = escape(str19);
				for (var i = 0; i < str19.length / 12; i++) {
					if (i > 23) {
						continue;
					}
					// else if(i>22){
					//     var st = str19.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					else {
						var st = str19.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				str26 = escape(str26);
				for (var i = 0; i < str26.length / 12; i++) {
					if (i > 28) {
						continue;
					}
					// else if(i>22){
					//     var st = str26.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }

					// else{
					var st = str26.slice(i * 12, (i + 1) * 12);
					console.log(i, st, unescape(st));
					data.push(st);
					// }
				}
				str28 = escape(str28);
				for (var i = 0; i < str28.length / 12; i++) {
					// if(i>1&&i<38){
					//     // continue
					//     var st = str28.slice(i*12+6,(i+1)*12+6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }
					// else if(i>22){
					//     var st = str28.slice(i*12-6,(i+1)*12-6);
					//     console.log(i,st,unescape(st))
					//     data.push(st);
					// }

					if ((i > 37 && i < 48) || (i > 49 && i < 64)) {
						// }
						var st = str28.slice(i * 12, (i + 1) * 12);
						console.log(i, st, unescape(st));
						data.push(st);
					}
				}
				console.log(data);
				return data;
			}
		}
	}
</script>

<style>
	.hello {
		/* padding-top:41px; */
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		/*height:30px;*/
	}

	.item {
		width: 50%;
		/*border-bottom: 1px solid red;*/
	}

	.d1 {
		width: 100%;
		height: 100%;
		background-color: #f87c0d;
		border-radius: 20%;
		/*overflow:hidden;*/
		box-shadow: 0px 0px 4px #e27235;
		position: relative;
	}

	.d2 {
		width: 100%;
		height: 35%;
		background-color: #ffc169;
		border-radius: 20%;
		box-shadow: 0px 0px 4px #e9c38a;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.d3 {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0px;
		color: #fff;
		top: 0px;
		font-weight: 900;
		text-align: center;
		/*line-height: 100%;*/
	}

	input {
		height: 20px;
		width: 100px;
		border: 1px solid #ccc;
	}

	.button {
		width: 49%;
		height: 30px;
		background-color: greenyellow;
	}

	.xx {
		text-align: center;
		overflow: hidden;
	}

	.content {
		height: 1000px;
		padding-top: 300px;
		background-color: #ccc;
	}

	td {
		border-collapse: collapse;
	}

	h3 {
		text-align: center;
	}

	.level {
		font-size: 20px;
		text-align: center;
	}
</style>
