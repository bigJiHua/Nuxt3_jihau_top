<script setup lang="ts">
const ListItem: any = ref([])

const SUrl = `${reqConfig.baseUrl}/data/Setting`
useFetch(SUrl, {
  method: 'get',
  params: {
    value: 'DevP'
  }
})
  .then(response => {
    const res: any = response.data.value
    ListItem.value = res.data
  })
  .catch(error => {
    console.error('Request failed:', error);
  });

useHead({
  title: 'jihau_top网站发展历程',
  meta: [
    {
      name: 'keywords',
      content: '发展、Login、JiHua、jihau.top、网站发展历程页面'
    },
    {
      name: 'description',
      content: '这是jihau.top网站的发展历程页面，欢迎您访问此网站！'
    }
  ]
})
</script>

<template>
  <div id="" class="DevProcess">
    <div class="Tree">
      <div class="Tree_dome" v-for="(item, index) in ListItem" :key="index">
        <div class="Tree_Area">
          <span class="set_title">迭代内容:</span>{{ item.set_title }}
          <a :href="item.set_url" v-if="item.set_url">点击查看</a>
          <span class="set_time">{{ item.set_change }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.DevProcess {
  width: 95vw;
  margin: 0 auto;
}

.Tree {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (min-width: 755px) {
  .Tree_dome {
    padding: 15px 30px;
    border-radius: 8px;
    margin: 5px;
    position: relative;
  }

  .Tree_Area {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    margin-left: 8px;
    font-size: 1.5rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }

  .check-btn {
    position: absolute;
    right: 30px;
    top: 2vh;
  }

  .edit_btn {
    font-size: 2rem;
    position: absolute;
    right: 7px;
    top: 13px;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
  }
}

@media only screen and (max-width: 755px) {
  .Tree {}

  .Tree_dome {
    padding: 25px;
    border-radius: 8px;
    margin-top: 15px;
    position: relative;
  }

  .Tree_Area {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    font-size: 1.2rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }

  .check-btn {
    position: absolute;
    right: 30px;
    top: 16vh;
    right: 2vw;
    z-index: 999;
    background-color: rgb(#C9D5E9);
  }

  .edit_btn {
    font-size: 2rem;
    position: absolute;
    right: 7px;
    top: 3px;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>

