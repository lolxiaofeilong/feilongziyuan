
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabbar/tabbar-1/tabbar-1","pages/tabbar/tabbar-2/tabbar-2","pages/tabbar/tabbar-3/tabbar-3","pages/tabbar/tabbar-4/tabbar-4","pages/tabbar/tabbar-5/tabbar-5","pages/mainPage/allCounty/main","pages/mainPage/allCounty/countyDetail","pages/mainPage/allCounty/storeDetail","pages/tab2/helpDetail","pages/tab2/release","pages/mainPage/beautifyPlace/main","pages/mainPage/car/main","pages/mainPage/junge/main","pages/mainPage/guangyun/main","pages/mainPage/junge/detailList","pages/mainPage/junge/detail","pages/mainPage/mySchedule/main","pages/mainPage/guangyun/one","pages/mainPage/guangyun/two","pages/mainPage/guangyun/three","pages/mainPage/guangyun/four","pages/mainPage/guangyun/five","pages/mainPage/addResource/add","pages/tabbar/tabbar-3/webView","pages/tabbar/tabbar-1/wangyou","pages/tabbar/tabbar-1/admin","pages/tabbar/tabbar-3/add","pages/tabbar/tabbar-1/login","pages/tabbar/tabbar-4/release","pages/tabbar/tabbar-4/detail","pages/tabbar/tabbar-4/accept"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"飞龙资源","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"borderStyle":"black","backgroundColor":"#fff","color":"#8F8F94","selectedColor":"#1296db","list":[{"pagePath":"pages/tabbar/tabbar-1/tabbar-1","iconPath":"static/tab/tab1_0.png","selectedIconPath":"static/tab/tab1_1.png","text":"首页"},{"pagePath":"pages/tabbar/tabbar-4/tabbar-4","iconPath":"static/tab/tab3_0.png","selectedIconPath":"static/tab/tab3_1.png","text":"互帮互助"},{"pagePath":"pages/tabbar/tabbar-3/tabbar-3","iconPath":"static/tab/tab4_0.png","selectedIconPath":"static/tab/tab4_1.png","text":"好消息"},{"pagePath":"pages/tabbar/tabbar-2/tabbar-2","iconPath":"static/tab/tab2_0.png","selectedIconPath":"static/tab/tab2_1.png","text":"朋友圈"},{"pagePath":"pages/tabbar/tabbar-5/tabbar-5","iconPath":"static/tab/tab5_0.png","selectedIconPath":"static/tab/tab5_1.png","text":"开发者中心"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"飞龙资源","compilerVersion":"2.8.8","entryPagePath":"pages/tabbar/tabbar-1/tabbar-1","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabbar/tabbar-1/tabbar-1","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"飞龙资源 ","titleNView":{"titleColor":"#fff","backgroundColor":"#fff","buttons":[{"fontSrc":"/static/uni.ttf","text":"","width":"30px","fontSize":"30px","color":"#ccc","background":"#ccc"}],"searchInput":{"backgroundColor":"#eee","borderRadius":"6px","placeholder":"点击搜索","disabled":true}}}},{"path":"/pages/tabbar/tabbar-2/tabbar-2","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全国朋友圈","titleNView":{"buttons":[{"text":"发布","fontSize":"16px","width":"50px","color":"#007AFF"}]}}},{"path":"/pages/tabbar/tabbar-3/tabbar-3","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全县好消息"}},{"path":"/pages/tabbar/tabbar-4/tabbar-4","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"互帮互助","titleNView":{"buttons":[{"text":"求助","fontSize":"16px","width":"50px","color":"#007AFF"}]}}},{"path":"/pages/tabbar/tabbar-5/tabbar-5","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"开发者中心"}},{"path":"/pages/mainPage/allCounty/main","meta":{},"window":{"navigationBarTitleText":"全县资源"}},{"path":"/pages/mainPage/allCounty/countyDetail","meta":{},"window":{}},{"path":"/pages/mainPage/allCounty/storeDetail","meta":{},"window":{}},{"path":"/pages/tab2/helpDetail","meta":{},"window":{}},{"path":"/pages/tab2/release","meta":{},"window":{"navigationBarTitleText":"发布消息"}},{"path":"/pages/mainPage/beautifyPlace/main","meta":{},"window":{}},{"path":"/pages/mainPage/car/main","meta":{},"window":{}},{"path":"/pages/mainPage/junge/main","meta":{},"window":{"navigationBarTitleText":"俊哥精心整理的资源"}},{"path":"/pages/mainPage/guangyun/main","meta":{},"window":{"navigationBarTitleText":"广云设计的找不同"}},{"path":"/pages/mainPage/junge/detailList","meta":{},"window":{}},{"path":"/pages/mainPage/junge/detail","meta":{},"window":{"navigationBarTitleText":"web-view"}},{"path":"/pages/mainPage/mySchedule/main","meta":{},"window":{}},{"path":"/pages/mainPage/guangyun/one","meta":{},"window":{"titleNView":false}},{"path":"/pages/mainPage/guangyun/two","meta":{},"window":{"titleNView":false}},{"path":"/pages/mainPage/guangyun/three","meta":{},"window":{"titleNView":false}},{"path":"/pages/mainPage/guangyun/four","meta":{},"window":{"titleNView":false}},{"path":"/pages/mainPage/guangyun/five","meta":{},"window":{"titleNView":false}},{"path":"/pages/mainPage/addResource/add","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-3/webView","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-1/wangyou","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-1/admin","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-3/add","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-1/login","meta":{},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/tabbar/tabbar-4/release","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-4/detail","meta":{},"window":{}},{"path":"/pages/tabbar/tabbar-4/accept","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
