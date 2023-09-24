<template>
  <div id="" class="about_m">
    <div class="document_author_introduce">
      <div class="phone_Viewset">
        <div class="author_logobox">
          <a href="http://me.jihau.top">
            <img src="https://www.jihau.top/img/logo.png" class="author_logo" alt="logo" />
          </a>
        </div>
        <div class="author_name coker">
          <a href="http://me.jihau.top">JiHua</a>
        </div>
      </div>
      <div class="introduce_doc" id="introduce_doc">
        <p>站长简介</p>
        <p>
          你好,我是此网站的站长:<a href="http://me.jihau.top" class="coker">JiHua</a>，很高兴认识你，也很荣幸您能访问我的网站，目前网站正在陆续搭建中，更多新功能等待上线！
        </p>
        <p>站点将陆续完成主页、分页及内容界面搭建，敬请期待！</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {}
  },
  name: 'AboutMe',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.phone_Viewset {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.author_logobox {
  height: 100px;
  width: 100px;
  padding: 15px 10px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(220, 220, 220, 0.8);
}

.author_logo {
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 755px) {

  /* 右侧作者设置 */
  .document_author_introduce {
    border-radius: 11px 11px 0 0;
    background-color: rgba(240, 243, 246, 0.5);
    padding: 20px;
  }

  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }

  .author_name>a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }

  .introduce_doc {
    text-align: justify;
  }

  .introduce_doc>p {
    font-size: 1.8rem;
    margin: 0;
  }

  .introduce_doc>p:first-child {
    text-align: center;
    margin: 0;
  }

  .introduce_doc>p:nth-child(2) {
    text-indent: 3.6rem;
  }

  .introduce_doc>p:nth-child(3) {
    text-indent: 3.6rem;
  }
}

@media only screen and (max-width: 755px) {

  /* 右侧作者设置 */
  .document_author_introduce {
    border-radius: 11px 11px 0 0;
    background-color: rgba(240, 243, 246, 0.8);
    padding: 20px;
  }

  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }

  .author_name>a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }

  .introduce_doc {
    text-align: justify;
  }

  .introduce_doc>p {
    font-size: 1.8rem;
    margin: 0;
  }

  .introduce_doc>p:first-child {
    text-align: center;
    margin: 0;
  }

  .introduce_doc>p:nth-child(2) {
    text-indent: 3.6rem;
  }

  .introduce_doc>p:nth-child(3) {
    text-indent: 3.6rem;
  }
}
</style>
