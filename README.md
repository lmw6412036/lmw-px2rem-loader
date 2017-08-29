# lmw-px2rem-loader
px2rem-loader升级版，以支持webpack2.0

### rem自适应布局原理可以自行检索

#### 安装
```bash
npm i -D lmw-px2rem-loader
```

#### 1、记住设置的unitPx的值（建议长期使用某个固定值），注意该值最好大于12（由于webkit内核不支持小于12px的字体）

#### 2、在页面加载时，我们可以根据设备实际的宽度与设计稿的比值，动态的去设置rem的值：
```basj
  var pxUnit = 100;     // 在px2rem中预设rem的值 即 1rem = ? px
  var designWid = 750;  // 设计稿宽度
  var winWid = window.innerWidth;
  var bl = winWid / designWid;
  document.querySelector('html').style.fontSize = (bl * pxUnit) + 'px';
```
#### 3、针对ios视网膜屏幕1px边框的问题（1px hairline），可以采用某宝的方案，在设置字体大小之前，根据屏幕像素比，更改页面的viewport：
```bash
var ua = navigator.userAgent.toLowerCase();
if (/iphone|ipad|ipod/.test(ua)) {
var sc = 1 / window.devicePixelRatio;
document.getElementsByName('viewport')[0].content = 'initial-scale='+ sc +', maximum-scale='+ sc +', minimum-scale='+ sc +', user-scalable=no';
}
```

#### 4、更改webpack配置文件（基于vue-cli构建的）
```bash
utils.js
+var px2rem = {
+    loader: "lmw-px2rem-loader",
+    options:{
+      remUnit:100
+    }
+  }

// generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
-    var loaders = [cssLoader]
+    var loaders = [cssLoader,px2rem]
```
