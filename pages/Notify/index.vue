<script setup lang="ts">
import getNlApi from '@/api/Article'
const notifyList: Array<any> = reactive([])

const getDevP = async () => {
  const { data: res } = await getNlApi.getNotifyList()
  notifyList.push(res.data)
}
onMounted(() => {
  getDevP()
})

useHead({
  title: '通知',
  meta: [
    {
      name: 'keywords',
      content: '通知、Notify、JiHua、jihau.top、通知页面'
    },
    {
      name: 'description',
      content: '这是jihau.top网站的通知页面，欢迎您访问此网站！'
    }
  ]
})
</script>

<template>
  <div id="" class="DevProcess">
    <div class="Tree">
      <div class="Tree_dome" v-for="(item, index) in notifyList[0]" :key="index">
        <div class="Tree_Area">
          <span class="set_title">通知:</span>
          <nuxt-link :to="'/Notify/' + item.notify_id">{{ item.title }}</nuxt-link>
          <span class="set_time">发布日期：{{ item.pub_date }}</span>
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
    padding: 15px 5px;
    border-radius: 8px;
    margin: 5px;
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
}

@media only screen and (max-width: 755px) {
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

}
</style>
