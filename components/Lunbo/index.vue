<script setup lang="ts">
import { useIndexLunBoStore } from '@/stores/useindexDemoData'
import getLunboData from '@/api/Page'

// Swiper（只在客户端使用）
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/less'
import 'swiper/less/navigation'
import 'swiper/less/pagination'

/* ========== Store ========== */
const store = useIndexLunBoStore()

/* ========== SSR 拉数据（关键） ========== */
const { data, pending, error } = await useAsyncData('lunbo', async () => {
  const { data: res } = await getLunboData.getSetting('Lunbo')
  return res
})

/* ========== 派生状态（统一数据源） ========== */
const images = computed(() => data.value?.data || [])
const isOpen = computed(() => data.value?.isOpen ?? false)

/* ========== 客户端缓存到 Store（只做缓存） ========== */
if (process.client && images.value.length) {
  store.setLunBoData(images.value)
}

/* ========== Swiper 配置 ========== */
const modules = [Navigation, Pagination, Scrollbar, Autoplay, A11y]

const swiperOption = {
  slidesPerView: 1,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { clickable: true },
  navigation: true,
}
</script>

<template>
  <div class="swiper-wrap" v-if="isOpen">
    <!-- SSR 渲染静态结构，客户端才加载 Swiper -->
    <ClientOnly>
      <swiper class="LunboArea" :modules="modules" v-bind="swiperOption">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img
            :src="image.set_difault"
            class="lunbo_img"
            :alt="image.set_title || '轮播图'"
          />
          <a v-if="image.set_title" :href="image.set_url" class="Lunbo_title">
            {{ image.set_title }}
          </a>
        </swiper-slide>
      </swiper>

      <!-- Swiper 加载前占位 -->
      <template #fallback>
        <div class="LunboArea skeleton" />
      </template>
    </ClientOnly>
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
    font-size: 2.5rem;
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
