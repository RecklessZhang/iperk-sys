<template>
  <div style="height: 100vh;">
    <iframe ref="aboutIframe" src="../../pages/about/index.html" style="width: 100%; height: 100%;"></iframe>
  </div>
</template>
<style>
html{           /* 解决页面会出现双滚动条问题。overflow: hidden; 溢出隐藏，给一个元素中设置overflow: hidden，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位。 */
  overflow: hidden;

  border: none;
}
body{           /* 解决页面上下左右会出现空白问题。让外框的外边距和内边距都为0 */
  margin: 0;
  padding: 0;
}
</style>
