<template>
  <div id="" class="center_box">
    <KeepAlive>
    <LeftM class="left"></LeftM>
    </KeepAlive>
    <KeepAlive>
      <RightM class="right" :isOpen="true"></RightM>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
const { $sayHello } = useNuxtApp()
$sayHello('JiHua')
useHead({
  title: 'JiHua的Web和JS开发数据',
  meta: [
    {
      name: 'keywords',
      content: 'JiHua,jihua,JiHua的Web和JS开发数据,JiHua的Web和JS开发数据,个人网站,C语言程序,Web语言,个人网站搭建'
    },
    {
      name: 'description',
      content: 'jihua的Web和js开发数据，一个神奇的个人网站，里面展现个人魅力，程序设计语言站点导航，以及软件使用方法和事件处理方法，包括但不限于C语言、C语言程序设计书籍、题型、作品等，网页逐渐搭建，不断更新中。一个神奇的个人网站！里面将有超多的内容知识。'
    }
  ]
})
</script>


<style lang="less" scoped>
.center_box {
  width: 100%;
}

@media only screen and (min-width: 755px) {
  .center_box {
    padding: 0;
    display: flex;
    position: relative;
    width: 70vw;
    margin: 0 auto;
    max-width: 1200px;
  }

  .left {
    width: 43vw;
    margin-right: 2vw;
    max-width: 700px;
  }

  .right {
    width: 25vw;
  }
}

@media only screen and (max-width: 755px) {
  .center_box {
    width: 95vw;
    margin: 0 auto;
    padding: 0;
  }
}

// Ipad样式测试
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 755px) and (max-height: 768px) {
  .center_box {
    margin-top: 20px;
    padding: 0;
    display: flex;
    position: relative;
    width: 80vw;
    margin: 0 auto;
    max-width: 1200px;
  }

  .left {
    width: 53vw;
    margin-right: 2vw;
    max-width: 700px;
  }

  .right {
    width: 27vw;
  }
}
</style>
