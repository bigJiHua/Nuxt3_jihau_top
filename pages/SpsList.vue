<script setup lang="ts">
const UserData: any = ref([])

const SUrl = `${reqConfig.baseUrl}/data/Setting`
useFetch(SUrl, {
  method: 'get',
  params: {
    value: 'Sps',
  },
})
  .then((response) => {
    const res: any = response.data.value
    UserData.value = res.data
  })
  .catch((error) => {
    console.error('Request failed:', error)
  })

useHead({
  title: '友链---JiHua的好朋友！',
  meta: [
    {
      name: 'keywords',
      content: '友链、友情链接、JiHua、jihau.top、通知页面、好朋友',
    },
    {
      name: 'description',
      content:
        '这是jihau.top网站的友链页面，欢迎您访问此网站！点击即可申请添加友链墙，互换website链接，成为最好的朋友！',
    },
  ],
})
</script>

<template>
  <div class="SpsList">
    <a
      href="/feedback/class/spslist"
      target="_blank"
      style="position: absolute; top: 50px; border: 0; left: 10px"
      >我也要加入!</a
    >
    <a
      class="github-corner"
      href="https://github.com/bigJiHua/Nuxt3_jihau_top"
      aria-label="在 GitHub 上查看源代码"
      target="_blank"
      style="position: absolute; top: 50px; border: 0; right: 0"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        aria-hidden="true"
        fill="#151513"
        color="#fff"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path>
      </svg>
    </a>
    <div class="ThanksTBox">
      <div class="ThanksT">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <strong>友链 · 鸣谢</strong>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="" class="SpsListBox">
      <div
        class="document_author_introduce"
        v-for="(item, index) in UserData"
        :key="index"
      >
        <div class="introduce_author">
          <a :href="item.set_url" class="author_logo_box" target="_blank">
            <img :src="item.set_difault" class="author_logo" alt="logo" />
          </a>
          <a :href="item.set_url" target="_blank" class="author_name">{{
            item.set_title
          }}</a>
          <div class="price_item" v-if="+item.set_difault01">赞助伙伴</div>
        </div>
        <div class="introduce_content">
          <div class="text">🤝 我们是好朋友嗷!</div>
          <div class="item">
            <p class="settiem">
              <span class="title">认识时间</span>
              <br />
              <span class="time">{{ item.set_time }}</span>
            </p>
            <a :href="item.set_url" target="_blank" class="LinkBtn"
              ><el-button>访问 ta 的博客</el-button></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// base -->
.ThanksT {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: center;

  > span {
    display: block;
    width: 6px;
    background-color: rgb(250, 195, 85);
  }

  > strong {
    font-size: 2.5rem;
    color: rgb(251, 114, 153);
    margin: 0 20px 0 10px;
  }

  > span:nth-child(1) {
    height: 10px;
    margin-right: 5px;
  }

  > span:nth-child(2) {
    height: 20px;
    margin-right: 5px;
  }

  > span:nth-child(3) {
    height: 30px;
    margin-right: 5px;
  }

  > span:nth-child(4) {
    height: 40px;
    margin-right: 5px;
  }

  > span:nth-child(6) {
    height: 40px;
    margin-right: 5px;
  }

  > span:nth-child(7) {
    height: 30px;
    margin-right: 5px;
  }

  > span:nth-child(8) {
    height: 20px;
    margin-right: 5px;
  }

  > span:nth-child(9) {
    height: 10px;
    margin-right: 5px;
  }
}
// -->
.SpsList {
  width: 85vw;
  margin: 0 auto;
}
@media screen and(max-width: 755px) {
  .SpsList {
    width: 100vw;
  }
}
.SpsListBox {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}
.document_author_introduce {
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
}
.document_author_introduce:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px #c9daef;
}
.introduce_author {
  display: grid;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px 12px 0 0;
  justify-items: center;
  position: relative;
  background-color: #eef2ff;
}
.author_logo_box {
  display: inline-block;
  width: 70px;
  height: 70px;
  background-color: #d1d1d15b;
  border-radius: 50%;
  overflow: hidden;
  .author_logo {
    width: 100%;
    height: 100%;
  }
}
.author_name {
  font-weight: 500;
  font-size: 2rem;
  color: #ff83a4;
  line-height: 30px;
}
.author_name:hover {
  color: #fc5682;
}
.price_item {
  padding: 5px 12px;
  font-size: 0.8rem;
  border-radius: 20px;
  background-color: #10b981a6;
  color: white;
  position: absolute;
  top: 10px;
  right: 15px;
}
.introduce_content {
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.text {
  padding: 20px;
  text-align: center;
}
.item {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #f8fafc;
  overflow: hidden;
}
.settiem {
  font-size: 1rem;
}
.LinkBtn > button {
  background-color: #fb7299;
  color: white;
}
.title {
  display: inline-block;
  margin-bottom: 5px;
  font-size: 0.8rem;
}
.time {
  font-size: 0.9rem;
}
</style>
