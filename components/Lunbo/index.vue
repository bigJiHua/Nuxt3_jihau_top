<script setup lang="ts">
import { useIndexLunBoStore } from '@/stores/useindexDemoData'
import getLunboData from '@/api/Page'
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/less'
import 'swiper/less/navigation'
import 'swiper/less/pagination'

const modules = [Navigation, Pagination, Scrollbar, Autoplay, A11y]
const swiperOption = {
  spaceBetween: 0,
  slidesPerView: 1, // 一屏显示的slide个数  'auto'
  slidesPerGroup: 1, // 每组多少个swiper滑块
  centeredSlides: true, // 居中的slide是否标记为active，默认是最左active,这样样式即可生效
  slideToClickedSlide: true, // 点击的slide会居中
  loop: true, // 循环播放, 可有无限滚动效果，初始加载即是滚动后的效果
  scrollbar: { draggable: true },
  grabCursor: true, // 抓手光标
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
    pauseOnMouseEnter: true, // 鼠标置于swiper是否时暂停自动切换
  },
  // 使用前进后退按钮来控制Swiper切换。
  navigation: true, // 1默认，在内
  // 2前进、后退按钮放到容器的外面
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  //   hiddenClass: "button-hidden", //隐藏时的class
  //   disabledClass: "button-disabled", //不可用时的class
  // },
  // 使用分页器导航
  pagination: { clickable: true },
}
const store = useIndexLunBoStore()
const images = ref(toRaw(store.getLunBoList))
// SSR请求轮播图 /data/Setting?value=
// const NUrl = `${reqConfig.baseUrl}/data/Setting`
// await useFetch(NUrl, {
//   method: 'get',
//   params: {
//     value: 'Lunbo',
//   },
// }).then((response) => {
//   const res: any = response.data.value
//   images.value = res.data
// })

const getLunBoList = async (): Promise<void> => {
  const { data: res } = await getLunboData.getSetting('Lunbo')
  store.setLunBoData(res.data)
  images.value = res.data
}
onMounted(() => {
  if (Object.keys(images.value).length === 0) {
    void getLunBoList()
  }
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (images.value) {
      store.setLunBoData(images.value)
    }
  }, 800)
  if (images.value.length === 0 && store.LunBoList.length !== 0) {
    images.value = toRaw(store.getLunBoList)
  }
})
</script>
<template>
  <div class="swiper-wrap">
    <swiper :modules="modules" class="mySwiper LunboArea" v-bind="swiperOption">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image.set_difault" class="lunbo_img" :alt="image.set_title !== '' ? image.set_title : '轮播图' " />
        <a :href="image.set_url" class="Lunbo_title">{{ image.set_title }}</a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="less">
@media only screen and (min-width: 755px) {
  .swiper-container {
    width: 100%;
    height: 250px;
  }

  .LunboArea {
    position: relative;
    height: 200px;
    width: 95%;
  }

  .Lunbo_title {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size:2.5rem;
    transform: translate(-50%, -50%);
    color: #e6f0fd;
  }
}

@media only screen and (max-width: 755px) {
  .LunboArea {
    width: 100%;
    height: 150px;
  }

  .Lunbo_title {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 2rem;
    transform: translate(-50%, -50%);
    color: #e6f0fd;
  }
}

.lunbo_box {
  position: relative;
}

.lunbo_img {
  height: 100%;
  width: 100%;
}

.LunboArea {
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
}
</style>
