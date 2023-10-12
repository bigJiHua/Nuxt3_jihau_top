<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import searchApi from '@/api/Article'
const key = ref('')
const type = ref('article')
const Articles: Array<any> = reactive([])
const Article = async () => {
  Articles[0] = []
  if (key.value && type.value) {
    const { data: res } = await searchApi.SearchApi(key.value, type.value)
    Articles[0] = res.data
  } else {
    ElMessage({
      message: '搜索词/搜索类型不能为空！',
      type: 'warning'
    })
  }
}
useHead({
  title: '搜索--jihau.top全站搜索'
})
</script>

<template>
  <div id="" class="search">
    <div class="Content_Area">
      <p>让我康康</p>
      <el-input v-model="key" placeholder="让我康康" class="input-with-select">
        <template #prepend>
          <el-select v-model="type" placeholder="搜索类型" style="width: 115px">
            <el-option label="文章" value="article" />
            <el-option label="通知" value="notify" />
            <el-option label="用户" value="user" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="Article" />
        </template>
      </el-input>
      <div class="value_area">
        <ul>
          <li v-for="(item, index) in Articles[0]" :key="index">
            <ArticlePageCard :item="item"></ArticlePageCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.value_area {
  overflow: scroll;
  background-color: red;
  >ul {
    list-style: none;
  }
}
@media only screen and (min-width: 755px) {
  .search {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .Content_Area {
    padding: 0 18vw;

    p:first-child {
      text-align: center;
      font-size: 10rem;
      letter-spacing: 4rem;
    }
  }

  .search_area {
    padding: 0 18vw;
    border-radius: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgb(0 0 0 / 20%);
    display: flex;
    justify-content: space-between;
  }

  .value_area {
    overflow: scroll;
    padding: 10px 20px;
    margin: 7px 30px 7px 5px;
    max-height: 38vh;
  }
}

@media only screen and (max-width: 755px) {
  .search {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .Content_Area {
    height: 100%;
    // background-color: rgba(240, 240, 240, 0.4);
    padding: 20px;

    p:first-child {
      font-weight: 600;
      text-align: center;
      font-size: 3.5rem;
      color: rgb(14, 14, 14) !important;
      letter-spacing: 2rem;
    }
  }

  .search_area {
    background-color: #fff;
    border-radius: 46px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
  }
  .value_area {
    height: 75vh;
    overflow: scroll;
  }
  
}
</style>

