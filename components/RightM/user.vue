<script lang="ts" setup>
import { useAuthorDataStore } from '@/stores/useUserData'
import getAuthorApi from '@/api/User'
const store = useAuthorDataStore()
const author: any = ref(store.ArticleAuthor)
const isLoding = ref(true)
const Users: any = reactive({
  fans: 0,
  user_content: '',
  user_id: '',
  user_pic: '',
  useridentity: '',
  username: '',
})
const Userdata: any = reactive({
  articles: 0,
  goodnums: 0,
  collects: 0,
  comments: 0
})
const getauthData = async () => {
  const { data: res } = await getAuthorApi.getAuthData(author.value)
  Users.fans = res.data.Users.fans
  Users.user_content = res.data.Users.user_content
  Users.user_id = res.data.Users.user_id
  Users.user_pic = res.data.Users.user_pic
  Users.useridentity = res.data.Users.useridentity
  Users.username = res.data.Users.username
  Userdata.articles = res.data.articles
  Userdata.goodnums = res.data.goodnums
  Userdata.collects = res.data.collects
  Userdata.comments = res.data.comments
  isLoding.value = false
}
onMounted(() => {
  const getUserData = setInterval(() => {
    author.value = store.ArticleAuthor
    if (author.value) {
      clearInterval(getUserData)
      getauthData()
    }
  }, 200)
})
</script>

<template>
  <div id="" class="UserArea" v-if="!isLoding">
    <!-- 背景板 -->
    <div class="background">
      <!-- 背景板 -->
      <div class="image">
      </div>
      <!-- logo -->
      <div class="authorLogo" v-if="Users.user_pic">
        <img :src="Users.user_pic" alt="logo" class="logo">
      </div>
      <div class="username">
        <nuxt-link :to="'/space/' + Users.username">{{ Users.username }}</nuxt-link>
      </div>
    </div>
    <!-- 数据展示 -->
    <div class="dataNum">
      <div class="showNumDataItem">
        <p class="Num">{{ Userdata.articles }}</p>
        <p class="NumText">文章数</p>
      </div>
      <div class="showNumDataItem">
        <p class="Num">{{ Userdata.collects }}</p>
        <p class="NumText">收藏数</p>
      </div>
      <div class="showNumDataItem">
        <p class="Num">{{ Users.fans }}</p>
        <p class="NumText">粉丝数</p>
      </div>
    </div>
    <!-- 用户操作区域 -->
    <div class="UserActionArea">
      <!-- TODO待开发事件 -->
      <el-button color="#76A9F5" plain>关注我</el-button>
      <el-button color="#76A9F5" plain>发私信</el-button>
    </div>
    <!-- 未来开发区域 -->
  </div>
</template>

<style lang="less" scoped>
.UserArea {
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 0 15px 0;
}

.background {
  height: 300px;
  width: 100%;
  position: relative;
}

.image {
  height: 50%;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: #ECF4FD;
  color: #1c1c1c;
  text-align: center;
  white-space: break-spaces;
  padding: 15px 0px;
}

.image::after {
  content: "⁶⁶ ⁶⁶⁶⁶⁶⁶   ⁶⁶66⁶⁶⁶⁶   ₆₆₆₆  可以啊.这 波  ₆₆₆₆ ⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶";
}

.authorLogo {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  padding: 30px;
  border-radius: 50%;
  background-color: #e3e3e364;
  border: 1px gray inset;
}

.logo {
  width: 100%;
  height: 100%;
}

.username {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;

  >a {
    color: #1c1c1c;
  }
}

.dataNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .showNumDataItem {
    margin: 0 15px;

    >p:first-child {
      font-size: 1.2rem;
      font-weight: 600;
    }

    >p:last-child {
      color: rgba(146, 146, 146, 0.82);
      font-size: 1.1rem;
      font-weight: 300;
    }
  }
}

.UserActionArea {
  display: flex;
  width: 80%;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
