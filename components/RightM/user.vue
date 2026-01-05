<script lang="ts" setup>
import { useRoute } from 'vue-router'
import getAuthorApi from '@/api/User'
import { useUserDataStore } from '@/stores/useUserData'
const store = useUserDataStore()

const isLoding = ref(false)
const isSelf = ref(false)
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
  comments: 0,
})
const router = useRoute()
// 获取作者信息
const getauthData = async (): Promise<void> => {
  const { data: res } = await getAuthorApi.getAuthData(
    router.params.id as string
  )
  Users.fans = res.data.Users.fans
  Users.user_content = res.data.Users.user_content
  Users.user_id = res.data.Users.user_id
  Users.user_pic = res.data.Users.user_pic
  Users.user_bgc = res.data.Users.user_bgc
  Users.useridentity = res.data.Users.useridentity
  Users.username = res.data.Users.username
  Userdata.articles = res.data.articles
  Userdata.goodnums = res.data.goodnums
  Userdata.collects = res.data.collects
  Userdata.comments = res.data.comments
  isLoding.value = false
  void getRelation()
}
const relation: Ref<boolean> = ref(false)
// 获取用户关系
const getRelation = async (): Promise<void> => {
  const storeUN = computed(() => store.Userdata?.Users?.username)
  // 如果是本人则截断
  if (storeUN.value === Users.username) {
    isSelf.value = true
    return
  }
  if (isLogin.value) {
    // 如果登录了且不是本人就 获取用户关系 权限接口
    const res = await fllowMe.SelectRelation(Users.username)
    relation.value = res
  }
}
// 添加用户关系
const addRelation = async (met: boolean): Promise<void> => {
  if (localStorage.getItem('Username') === Users.username) {
    ElMessage({
      message: '你很酷！ 但是不能关注自己哟！',
      type: 'warning',
    })
    return
  }
  if (localStorage.getItem('Username') === null) {
    ElMessage({
      message: '请登录',
      type: 'warning',
    })
  } else {
    if (
      Users.username === '' ||
      Users.username === undefined ||
      Users.username === null
    ) {
      ElMessage({
        message: '非法',
        type: 'warning',
      })
      return
    }
    const tip = '你确定要' + (met ? '关注' : '取消关注') + '他吗？'
    if (await WarningTips(tip)) {
      relation.value = met
      await fllowMe
        .AddRelation(Users.username)
        .then(() => {
          // 关注成功
          relation.value = true
          void getRelation()
        })
        .catch(() => {
          // 取消关注成功
          relation.value = false
        })
    }
  }
}

// 监听登录
const isLogin = ref(false)
const StoreisLogin = computed(() => store.isLogin)
watch(
  StoreisLogin,
  (newVal) => {
    if (newVal) {
      isLogin.value = true
    } else {
      isLogin.value = false
    }
  },
  { immediate: true }
)
onMounted(() => {
  void getauthData()
  // isLogin.value = store.isLogin
})
</script>

<template>
  <div id="" class="UserArea">
    <!-- 背景板 -->
    <div class="background">
      <!-- 背景板 -->
      <div class="images" v-if="Users.user_bgc">
        <img :src="Users.user_bgc" alt="背景图" />
      </div>
      <div class="image" v-else></div>
      <!-- logo -->
      <div class="authorLogo">
        <img :src="Users.user_pic" alt="logo" class="logo" />
      </div>
      <div class="username">
        <nuxt-link :to="'/space/' + Users.username">{{
          Users.username
        }}</nuxt-link>
        <p class="flag-text">
          {{ Users.user_content }}
        </p>
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
      <div v-if="isSelf && isLogin">
        <nuxt-link class="EditUserData" to="/Users">
          <el-button type="primary" plain class="UABtton"
            >编辑个人信息</el-button
          ></nuxt-link
        >
      </div>
      <div v-else-if="!relation">
        <el-button
          type="primary"
          plain
          @click="addRelation(true)"
          class="UABtton"
          >关注我</el-button
        >
      </div>
      <div v-else>
        <el-button
          type="warning"
          plain
          @click="addRelation(false)"
          class="UABtton"
          >取消关注</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.UserArea {
  background-color: #fff;
  border-radius: 5px;
}

.background {
  height: 250px;
  width: 100%;
  position: relative;
}

.image,
.images {
  height: 50%;
  border-radius: 5px 5px 0 0;
  background-color: #ecf4fd;
  color: #1c1c1c;
  text-align: center;
  white-space: break-spaces;
  padding: 15px;
}
.images {
  height: 65%;
  padding: 0;
  > img {
    width: 100%;
    height: 100%;
  }
}
.image::after {
  content: '⁶⁶ ⁶⁶⁶⁶⁶⁶   ⁶⁶66⁶⁶⁶⁶   ₆₆₆₆  可以啊.这 波  ₆₆₆₆ ⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶';
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
  text-align: center;
  margin-top: 30px;
  font-size: 2.2rem;
  > a {
    color: #1c1c1c;
  }
  .flag-text {
    font-size: 0.8rem;
    color: #777777b8;
    width: 80%;
    text-align: center;
    margin: 0 auto;
    word-break: break-word;
  }
}

.dataNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  .showNumDataItem {
    margin: 0 15px;

    > p:first-child {
      font-size: 1.2rem;
      font-weight: 600;
    }

    > p:last-child {
      color: rgba(146, 146, 146, 0.82);
      font-size: 1.1rem;
      font-weight: 300;
    }
  }
}

.UserActionArea {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  .UABtton {
    margin: 15px 0;
  }
}
</style>
