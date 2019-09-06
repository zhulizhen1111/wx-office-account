const baseSize = 32

// 设置 rem 函数

function setRem () {

  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。

  const scale = document.documentElement.clientWidth / 750

  // 设置页面根节点字体大小

  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'

}

// 初始化

setRem()

// 改变窗口大小时重新设置 rem

window.onresize = function () {

  setRem()

}
// (function(doc, win) {
//   //做rem适配
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function() {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       var fs = clientWidth / 25;
//       docEl.style.fontSize = fs + 'px';
//       return fs
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
//   module.exports = recalc();
// })(document, window);
//不允许缩放
//<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />