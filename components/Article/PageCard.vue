<!-- 搜索功能的展示卡片 -->
<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    },
  },
})
const id = ref(
  props.item.article_id ? props.item.article_id : props.item.notify_id
)
const link = ref(
  props.item.article_id ? `/article/${id.value}  ` : `/Notify/${id.value}`
)
const isUser = ref(props.item.user_id ? true : false)
onMounted(() => {
  if (/、/.test(props.item.keyword)) {
    props.item.keyword = props.item.keyword.split('、')
  }
})
</script>

<template>
  <div id="" class="itemarea" v-if="isUser">
    <div class="Usercard">
      <div class="UserData">
        <div class="UserImg">
          <img :src="item.user_pic" alt="Logo" v-if="item.user_pic" />
          <img
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            alt="defalut"
            v-else
          />
        </div>
        <div class="UserContent">
          <p class="username">
            <nuxt-link :to="'/space/' + item.username">{{
              item.username
            }}</nuxt-link>
          </p>
          <div>
            <p class="useridentity">
              <el-tag size="small">{{ item.useridentity }}</el-tag>
            </p>
            <p class="content">
              {{ item.user_content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="" class="itemarea" v-else>
    <div class="card">
      <div class="card_title">
        <div class="User">
          <nuxt-link :to="{ path: '/space/' + item.username }">
            {{ item.username }}</nuxt-link
          >
          <span>发布于{{ item.pub_date }}</span>
        </div>
        <nuxt-link :to="link">
          <h3>{{ item.title }}</h3>
        </nuxt-link>
      </div>
      <article>
        <nuxt-link :to="link"> {{ item.content }}... </nuxt-link>
      </article>
      <div class="details">
        <p>
          <el-tag
            size="small"
            v-for="(word, index) in item.keyword"
            :key="index"
            >{{ word }}</el-tag
          >
        </p>
        <el-tag size="small">标签：{{ item.lable }}</el-tag>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.itemarea {
  border-radius: 5px;
  background-color: rgba(240, 243, 246, 0.4);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  overflow: scroll;
}

.itemarea::-webkit-scrollbar {
  display: none;
}

.Usercard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 5px;
}

.UserImg {
  > img {
    width: 45px;
    height: 45px;
  }
}

.UserData {
  display: flex;
}

.UserContent {
  margin: 5px;

  > div {
    display: flex;

    > p {
      margin: 5px;
    }
  }
}

.User {
  a {
    color: #fb7299;
  }

  > span {
    font-size: 0.8rem;
    display: inline-block;
    margin: 10px;
  }
}

@media only screen and (min-width: 755px) {
  .card {
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .details {
    p {
      margin-right: 5px;
    }
  }
}

@media only screen and (max-width: 755px) {
  .card {
    margin: 8px 0;
    padding: 5px;
  }

  .details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

    p {
      color: black;
    }
  }
}
</style>
