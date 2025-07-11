<!-- 搜索功能的展示卡片 -->
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    },
  },
})
const id = ref(
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  props.item.article_id ? props.item.article_id : props.item.notify_id
)
const link = ref(
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  props.item.article_id ? `/article/${id.value}  ` : `/Notify/${id.value}`
)
const isUser = ref(props.item.user_id ? true : false)
// 计算标签
const tagcmp = (item: string): string[] => {
  if (typeof item !== 'string') {
    return item
  } else {
    return item.split(/[、,，]/)
  }
}

onMounted(() => {
  if (/、/.test(props.item.keyword)) {
    props.item.keyword = props.item.keyword.split('、')
  }
})
</script>

<template>
  <div class="itemarea" v-if="isUser">
    <!-- 用户卡片 -->
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
            <nuxt-link :to="'/space/' + item.username" target="_blank">{{
              item.username
            }}</nuxt-link>
          </p>
          <div>
            <p class="useridentity">
              <el-tag
                v-for="tag in tagcmp(item.useridentity)"
                :key="tag"
                class="tag"
                size="small"
                style="margin-right: 10px"
                ><nuxt-link :to="'/search/' + tag">{{ tag }}</nuxt-link></el-tag
              >
            </p>
            <p class="content">
              {{ item.user_content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="itemarea" v-else>
    <div class="card">
      <div class="card_title">
        <nuxt-link :to="link">
          <h3>{{ item.title }}</h3>
        </nuxt-link>
        <div class="User">
          <nuxt-link :to="{ path: '/space/' + item.username }">
            {{ item.username }}</nuxt-link
          >
          <span>发布于{{ item.pub_date }}</span>
        </div>
      </div>
      <article>
        <nuxt-link :to="link"> {{ item.content }}... </nuxt-link>
      </article>
      <div class="details">
        <p>
          <span class="tag-title">关键词：</span>
          <el-tag
            v-for="tag in tagcmp(item.keyword)"
            :key="tag"
            class="tag"
            size="small"
            style="margin-right: 5px"
            ><nuxt-link :to="'/search/' + tag">{{ tag }}</nuxt-link></el-tag
          >
        </p>
        <p>
          <span class="tag-title">标签：</span>
          <el-tag
            v-for="tag in tagcmp(item.lable)"
            :key="tag"
            class="tag"
            size="small"
            style="margin-right: 5px"
            ><nuxt-link :to="'/search/' + tag">{{ tag }}</nuxt-link></el-tag
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.itemarea {
  background-color: #f1f8ff;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: inset rgba(70, 142, 230, 0.8) 0 0 2px 0.8px;
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

.tag-title {
  font-size: 0.8rem;
  color: #383838;
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
    padding: 8px 10px;
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
