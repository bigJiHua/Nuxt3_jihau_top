<script setup lang="ts">
import spaceApi from '@/api/Page'
import { useRouter } from 'vue-router'
const router = useRouter()
const user: Ref<string> = ref(
  router.currentRoute.value.params.id
) as Ref<string>
const UserData: any = ref({
  username: '',
  user_id: '',
  useridentity: '',
  sex: '',
  city: '',
  user_pic: '',
  user_bgc: '',
  user_content: '',
  birthday: '',
  registerDate: 0
})
const isSelf: Ref<boolean> = ref(false)
const UserDataPIC = ref('')
const isOad: Ref<boolean> = ref(false)
const istop: Ref<boolean> = ref(false)
const tabPanel: any = ref<HTMLElement | null>(null)
const isHerePath: Ref<number> = ref(0)
// 路由菜单
const UserTab = ref([
  // { path: `/space/${user.value}/index`, name: '动态' },
  { path: `/space/${user.value}/article`, name: '文章' },
  { path: `/space/${user.value}/like`, name: '喜欢' },
  { path: `/space/${user.value}/collect`, name: '收藏' },
  { path: `/space/${user.value}/follow`, name: '关注' },
  { path: `/space/${user.value}/fans`, name: '粉丝' },
])
// 获取用户数据
const getUserData = async (): Promise<void> => {
  spaceApi
    .GetSpaceData(user.value)
    .then((resData: any) => {
      const { data: res } = resData
      UserData.value.username = res.data.UserData.username
      UserData.value.user_id = res.data.UserData.user_id
      UserData.value.useridentity = res.data.UserData.useridentity
      UserData.value.sex = res.data.UserData.sex
      UserData.value.city = res.data.UserData.city
      UserData.value.user_pic = res.data.UserData.user_pic
      UserData.value.user_bgc = res.data.UserData.user_bgc
      UserData.value.user_content = res.data.UserData.user_content
      UserData.value.birthday = res.data.UserData.birthday
      UserData.value.registerDate = res.data.UserData.registerDate
      isSelf.value = res.data.isSelf
      UserDataPIC.value = res.data.UserData.user_pic
      setTimeout(() => {
        isOad.value = true
      }, 500)
    })
    .catch(async (err: any) => {
      const { data: res } = err
      if (res.status === 404) {
        return await router.push('/404')
      } else if (res.status === 403) {
        return await router.push('/error/403')
      }
    })
}

// 检查是否离顶
const checkScTp = (): void => {
  const windowST = window.scrollY
  if (windowST >= 303) {
    istop.value = true
  } else {
    istop.value = false
  }
}

// 手动跳转
const toTap = (path: string, index: number): void => {
  const routerPath = path.match(/\/([^/]+)$/)
  if (routerPath[1] === 'index') {
    path = path.replace(/\/index$/, '')
  }
  isHerePath.value = index
  void router.replace(path)
  setTimeout(() => {
    window.moveTo(0, 300)
  }, 200)
}
onMounted(async () => {
  if (UserData.value.username === '') {
    void getUserData()
  }
  window.addEventListener('scroll', checkScTp)
  setInterval(() => {
    const path = router.currentRoute.value.path.match(/\/([^/]+)$/)
    switch (path[1]) {
      case 'index':
        isHerePath.value = 0
        break
      case 'article':
        isHerePath.value = 1
        break
      case 'like':
        isHerePath.value = 2
        break
      case 'collect':
        isHerePath.value = 3
        break
      case 'follow':
        isHerePath.value = 4
        break
      case 'fans':
        isHerePath.value = 5
        break
      default:
        isHerePath.value = 0
    }
  }, 500)
})
</script>
<template>
  <div class="DefaultLayout">
    <HeaderSpace
      class="phone-none"
      :istop="istop"
      :user="user"
      :isSelf="isSelf"
    ></HeaderSpace>
    <div class="body ContentBox">
      <!-- 用户信息 -->
      <SpaceItem :data="UserData" :isSelf="isSelf" v-if="isOad"></SpaceItem>
      <!-- 内容主体 -->
      <div class="userContentBox wsee" v-if="isOad" ref="tabPanel">
        <div class="leftBar UserListArea">
          <!-- 切换页面 -->
          <div :class="[{ isNone: istop }, 'menuTab']">
            <div
              :class="[{ selectItem: isHerePath === index + 1 }, 'menuItem']"
              v-for="(item, index) in UserTab"
              :key="index"
              @click="toTap(item.path, index)"
            >
              <span class="TabPath">{{ item.name }}</span>
            </div>
          </div>
          <slot />
        </div>
        <div class="rightBar">
          <el-affix v-if="isOad" :offset="60">
            <SpaceRight></SpaceRight>
          </el-affix>
        </div>
      </div>
      <div class="userContentBox psee" v-if="isOad" ref="tabPanel">
        <div class="leftBar window-none">
          <div class="UserListArea">
            <div :class="[{ isNone: istop }, 'menuTab']">
              <div
                :class="[{ selectItem: isHerePath === index + 1 }, 'menuItem']"
                v-for="(item, index) in UserTab"
                :key="index"
                @click="toTap(item.path, index)"
              >
                <span class="TabPath">{{ item.name }}</span>
              </div>
            </div>
            <slot />
          </div>
        </div>
      </div>
    </div>
    <Backtop></Backtop>
  </div>
</template>

<style lang="less" scoped>
.UserListArea {
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
}
.DefaultLayout {
  background-color: #edf1f5;
}

.body {
  height: calc(100% - 50px);
  width: 70vw;
  margin: 0 auto;
}

.userContentBox {
  display: flex;
  margin-top: 10px;
}

.leftBar {
  width: 50vw;
  flex: 2;
  margin-right: 10px;
}

.rightBar {
  flex: 1;
  width: 15vw;
  height: 500px;
  margin-left: 10px;
}

.menuTab {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
}
.menuItem {
  padding: 5px 20px;
}
.selectItem {
  padding-bottom: 5px;
  border-bottom: 2.5px #6ba2f4 solid;
}
.TabPath {
  font-size: 1rem;
}

@media only screen and (max-width: 755px) {
  .body {
    height: calc(100% - 50px);
    width: 100vw;
    margin: 0 auto;
    background-color: #fff;
    overflow: scroll;
  }
  .userContentBox {
    display: block;
    margin: 0;
  }
  .rightBar {
    display: none;
  }
  .UserListArea {
    width: calc(100vw - 16px);
    padding: 0 8px;
  }

  .menuTab {
    justify-content: space-between;
    border-bottom: 1px rgb(231, 231, 231) solid;
  }
  .menuItem,
  .menuItem:first-child {
    margin: 0;
    padding: 10px 15px;
  }
  .TabPath {
    letter-spacing: 5px;
    font-size: 1.1rem;
  }
  .selectItem > .TabPath {
    font-weight: 500;
  }
  .wsee {
    display: none;
  }
}
@media only screen and (min-width: 755px) {
  .isNone {
    display: none;
    opacity: 0;
  }
  .psee {
    display: none;
  }
}
</style>