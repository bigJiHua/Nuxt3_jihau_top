<script setup lang="ts">
const UserData: any = ref([])

const SUrl = `${reqConfig.baseUrl}/data/Setting`
useFetch(SUrl, {
  method: 'get',
  params: {
    value: 'Sps'
  }
})
  .then(response => {
    const res: any = response.data.value
    UserData.value = res.data
  })
  .catch(error => {
    console.error('Request failed:', error);
  });

useHead({
  title: '友链---JiHua的好朋友！',
  meta: [
    {
      name: 'keywords',
      content: '友链、友情链接、JiHua、jihau.top、通知页面、好朋友'
    },
    {
      name: 'description',
      content: '这是jihau.top网站的友链页面，欢迎您访问此网站！点击即可申请添加友链墙，互换website链接，成为最好的朋友！'
    }
  ]
})
</script>

<template>
  <div class="SpsList">
    <a href="https://jihau.com/%e6%84%8f%e8%a7%81%e5%8f%8d%e9%a6%88"
      style="position: absolute; top: 60px; border: 0; left: 20px">我也要加入!</a>
    <a class="github-corner" href="https://github.com/bigJiHua/Vue_jihau_top/tree/master" aria-label="在 GitHub 上查看源代码"
      target="_blank" style="position: absolute; top: 50px; border: 0; right: 0">
      <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true" fill="#151513" color="#fff">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor" style="transform-origin: 130px 106px" class="octo-arm"></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <div class="ThanksTBox">
      <div class="ThanksT">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <strong>友链 · 鸣谢赞助</strong>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="" class="SpsListBox">
      <div class="document_author_introduce" v-for="(item, index) in UserData" :key="index">
        <div class="phone_Viewset">
          <div class="author_logoset">
            <a :href="item.set_url">
              <img :src="item.set_difault" class="author_logo" alt="logo" />
            </a>
          </div>
          <div class="author_name coker">
            <a :href="item.set_url">{{ item.set_title }}</a>
          </div>
        </div>
        <div class="introduce_doc" id="introduce_doc">
          <div class="priceArea" v-if="+item.set_difault01">
            <p class="rmbicon">好朋友{{ item.set_title }} 支持了 :</p>
            <span class="price">{{ item.set_difault01 }}</span>
          </div>
          <div class="priceArea" v-else>
            <p>我们是好朋友嗷！</p>
          </div>
        </div>
        <div class="LinkBoxArea">
          <p class="settiem" v-if="+item.set_difault01">
            赞助时间<br />{{ item.set_time }}
          </p>
          <p class="settiem" v-else>认识时间<br />{{ item.set_time }}</p>
          <a :href="item.set_url" class="LinkBtn"><el-button>访问 {{ item.set_title }} 的博客</el-button></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.SpsListBox {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.phone_Viewset {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
}

.document_author_introduce {
  border-radius: 5px;
  margin: 10px;
}

.priceArea {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 15px 0;
}

.introduce_doc {
  text-align: center;
}

.author_logoset {
  overflow: hidden;
}

.rmbicon::after {
  content: '￥';
  font-size: 1.2rem;
  color: rgb(221, 78, 98);
}

.price {
  color: rgb(221, 78, 98);
  width: 35px;
}

.LinkBtn button {
  background-color: rgb(251, 114, 153);
  color: white !important;
  border-radius: 8px;
}

.LinkBoxArea {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.settiem {
  text-align: center;
}

@media only screen and (min-width: 755px) {
  .SpsListBox {
    width: 85vw;
    margin: 0 auto;
  }

  .document_author_introduce {
    width: 30%;
    min-height: 180px;
    background-color: #ffffff68;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    border-radius: 8px;
    padding: 20px 10px;
  }

  .document_author_introduce:hover {
    background-color: #fff;
  }

  .author_logoset {
    width: 80px;
    height: 80px;
    background-color: rgba(220, 221, 221, 0.884);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    margin-right: 30px;
  }

  .author_logo {
    width: 100%;
    height: 100%;
  }

  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 3rem;
  }

  .author_name>a:hover {
    color: rgb(221, 78, 98);
    text-decoration: none;
  }

  .ThanksT {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;

    >span {
      display: block;
      width: 6px;
      background-color: rgb(250, 195, 85);
    }

    >strong {
      font-size: 2.5rem;
      color: rgb(251, 114, 153);
      margin: 0 20px 0 10px;
    }

    >span:nth-child(1) {
      height: 10px;
      margin-right: 5px;
    }

    >span:nth-child(2) {
      height: 20px;
      margin-right: 5px;
    }

    >span:nth-child(3) {
      height: 30px;
      margin-right: 5px;
    }

    >span:nth-child(4) {
      height: 40px;
      margin-right: 5px;
    }

    >span:nth-child(6) {
      height: 40px;
      margin-right: 5px;
    }

    >span:nth-child(7) {
      height: 30px;
      margin-right: 5px;
    }

    >span:nth-child(8) {
      height: 20px;
      margin-right: 5px;
    }

    >span:nth-child(9) {
      height: 10px;
      margin-right: 5px;
    }
  }
}

@media only screen and (max-width: 755px) {
  .SpsList {
    padding: 20px 0 0 0;
  }

  .SpsListBox {
    width: 95vw;
    margin: 0 auto;
  }

  .document_author_introduce {
    width: 100vw;
    background-color: rgba(240, 243, 246, 0.8);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
  }

  .author_logoset {
    padding: 10px;
    width: 80px;
    height: 80px;
    background-color: rgba(220, 221, 221, 0.5);
    border-radius: 50px;
  }

  .author_logo {
    width: 100%;
    height: 100%;
  }

  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 3rem;
  }

  .author_name>a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }

  .ThanksT {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;

    >span {
      display: block;
      width: 6px;
      background-color: rgb(241, 204, 128);
    }

    >strong {
      font-size: 2rem;
      color: rgb(251, 114, 153);
      margin: 0 10px;
    }

    >span:nth-child(1) {
      height: 10px;
      margin-right: 5px;
    }

    >span:nth-child(2) {
      height: 20px;
      margin-right: 5px;
    }

    >span:nth-child(3) {
      height: 30px;
      margin-right: 5px;
    }

    >span:nth-child(4) {
      height: 40px;
      margin-right: 5px;
    }

    >span:nth-child(6) {
      height: 40px;
      margin: 0 5px 0 5px;
    }

    >span:nth-child(7) {
      height: 30px;
      margin-right: 5px;
    }

    >span:nth-child(8) {
      height: 20px;
      margin-right: 5px;
    }

    >span:nth-child(9) {
      height: 10px;
      margin-right: 5px;
    }
  }
}
</style>

