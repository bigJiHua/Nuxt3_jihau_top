<script setup lang="ts">
import getArc from '@/api/Article'
const props = defineProps({
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
})
const misOpen = ref(false)
const isLoading = ref(false)
const ArticleListData = ref([])
const downData = async (): Promise<void> => {
  misOpen.value = !misOpen.value
  if (ArticleListData.value.length !== 0) return
  const key = props.year + (props.month < 10 ? '-0' : '-') + props.month + '%'
  const { data: res } = await getArc.getArchive('get', key)
  if (res.status === 200) {
    ArticleListData.value = res.data
    isLoading.value = true
  }
}
</script>

<template>
  <div id="" class="month">
    <span class="mnumber" @click="downData">{{ props.month }}月</span>
    <ol v-if="isLoading">
      <li
        :class="{ daylists: misOpen, daylist: !misOpen }"
        v-for="(obj, index) in ArticleListData"
        :key="index"
      >
        <router-link :to="'/article/' + obj.article_id" @click="misOpen = !misOpen">
          {{ obj.title }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<style lang="less" scoped>
.mnumber {
  font-size: 1.5rem;
  margin-left: 20px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  display: block;
  width: 94%;
  background-color: #a8c3ff24;
}

/* 日历和现在时间 */
.daylist {
  display: none;
}

.daylists a {
  text-decoration: none;
  color: rgb(11, 133, 255);
  font-weight: bolder;
}

.daylists:hover {
  background-color: rgb(200, 227, 255);

  > a {
    color: rgb(108, 174, 240);
  }
}

.daylist {
  display: none;
}

.daylists {
  display: block;
  list-style: none;
  line-height: 2rem;
  text-indent: 2.5rem;
}

.daylists ol a {
  text-decoration: none;
  color: rgb(38, 130, 221);
  font-weight: bolder;
}
</style>
