<script setup lang="ts">
import getArc from '@/api/Article'
import { useArchiveListStore } from '@/stores/useArticleData'
const store = useArchiveListStore()
const monthlist: any = ref([])
const ArticleData: any = ref([])
const yearlist: any = ref(toRaw(store.getArchive.YearListData))
const AllArticleData: any = ref(toRaw(store.getArchive.ArchiveListData))
const getdata = async (): Promise<void> => {
  const { data: res } = await getArc.getArchive()
  const getArticleData = res.data
  // 筛出年份
  const articleListYear = [
    ...new Set(getArticleData.map((data: any) => data.year)),
  ].filter((year) => year !== 0)
  // 筛出月份
  const articleListMonth = [
    ...new Set(getArticleData.map((data: any) => data.month)),
  ]
  /*  筛出不同年份对应的数据
  [
    [
      year: '',
      data: [{
        year: '',
        month: ''
      }]
    ]
  ]
  */
  for (let i = 0; i < articleListYear.length; i++) {
    const filterYearData = getArticleData.filter(
      (word: any) => word.year === articleListYear[i]
    )
    if (filterYearData.length !== 0) {
      ArticleData.value.push({
        year: articleListYear[i],
        data: filterYearData,
      })
    }
  }
  yearlist.value = articleListYear
  monthlist.value = articleListMonth
  AllArticleData.value = ArticleData.value.reverse()
  store.setArchive({
    Archive: AllArticleData.value,
    YearListData: yearlist.value,
  })
  AllArticleData.value = toRaw(store.getArchive.ArchiveListData)
}
onMounted(() => {
  if (Object.keys(AllArticleData.value).length === 0) {
    void getdata()
  }
})
</script>

<template>
  <div class="ararc">
    <p class="ararc_title Cookie">文章归档</p>
    <div class="ararc_list" v-for="(year, index) in yearlist" :key="index">
      <RightMArticleListYearitem :index="index" :AllData="AllArticleData" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .ararc {
    width: 25vw;
    max-width: 480px;
  }
}
.ararc {
  min-height: 120px;
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  border-radius: 5px;
  padding: 10px;
  max-height: 250px;
  overflow: scroll;
}

.ararc_title {
  text-align: center;
  font-size: 2rem;
  font-weight: bolder;
  font-family: 'songti';
}

.ararc_list {
  margin-top: 10px;
  background-color: rgb(231 243 255 / 60%);
  border-radius: 11px;
  padding: 0 10px;
  overflow: scroll;
}

.ararc_list::-webkit-scrollbar {
  display: none;
}

.ararc::-webkit-scrollbar {
  display: none;
}
</style>
