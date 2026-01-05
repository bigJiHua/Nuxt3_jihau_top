<script setup lang="ts">
import GetUData from '@/api/User'
import { Plus, Female, Male, Position } from '@element-plus/icons-vue'
import { useUserDataStore } from '@/stores/useUserData'
const store = useUserDataStore()
interface User {
  username: string
  user_id: string
  useridentity: string
  sex: string
  city: string
  user_pic: string
  user_bgc: string
  user_content: string
  birthday: string
  registerDate: number
}
const props = defineProps({
  data: {
    type: Object as () => User,
    default: () => ({
      username: '',
      user_id: '',
      useridentity: '',
      sex: '',
      city: '',
      user_pic: '',
      user_bgc: '',
      user_content: '',
      birthday: '',
      registerDate: 0,
    }),
  },
  isSelf: {
    type: Boolean,
    default: false,
  },
})
const UserData: Ref<User> = ref(props.data)
const isSelf: Ref<boolean> = ref(props.isSelf)
const relation: Ref<boolean> = ref(false)
const defaultUserLogo: Ref<string> = ref(icon.UserdefaultLogo)
// 编辑用户背景图片
const EditorBgc = (): void => {
  if (!isSelf.value) return
  const bgcOrigin = ref(UserData.value.user_bgc)
  ElMessageBox.prompt('请输入图片 URL or Base64格式', '提示', {
    confirmButtonText: '变更',
    cancelButtonText: '取消',
    inputPattern: /^(https?:\/\/.*|data:image\/[a-zA-Z]+;base64,[\w+/]+=*)$/,
    inputErrorMessage: '请输入图片 URL or Base64格式',
  })
    .then(async ({ value }) => {
      // 调用GetUData.CagUserData方法修改用户信息
      if (UserData.value.user_id === '') {
        ElMessage({
          type: 'error',
          message: '参数错误',
        })
        return
      }
      const data = {
        user_bgc: value,
      }
      UserData.value.user_bgc = value
      const { data: res } = await GetUData.CagUserData(
        UserData.value.user_id,
        data
      )
      if (res.status !== 200) {
        UserData.value.user_bgc = ''
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
      UserData.value.user_bgc = bgcOrigin.value
    })
}

// 添加用户关系
const addRelation = async (met: boolean): Promise<void> => {
  if (isSelf.value) return
  if (props.data.username === '') return
  if (!met) relation.value = true
  relation.value = !relation.value
  const res = await fllowMe.AddRelation(props.data.username)
  if (!res) {
    relation.value = false
  } else {
    setTimeout(() => {
      void getRelation()
    }, 1000)
  }
}
// Store里的用户名 默认登录才有的
const storeUN = computed(() => store.Userdata?.Users?.username)
// 获取用户关系
const getRelation = async (): Promise<void> => {
  if (storeUN.value !== undefined && !props.isSelf) {
    const islogin = computed(() => store.isLogin)
    if (islogin.value) {
      const res = await fllowMe.SelectRelation(props.data.username)
      relation.value = res
    }
  }
}

// 判断是否是自己
watch(
  storeUN,
  (newVal) => {
    if (
      newVal !== undefined &&
      props.data.username !== undefined &&
      newVal === props.data.username
    ) {
      isSelf.value = true
    } else {
      isSelf.value = false
    }
  },
  { immediate: true }
)

onMounted(() => {
  void getRelation()
})
</script>

<template>
  <div class="UserBox">
    <div class="UserBgc">
      <img
        class="user_bgc"
        v-if="UserData.user_bgc"
        :src="UserData.user_bgc"
        alt="用户背景图片"
      />
      <div v-else class="BgcBox"></div>
      <p class="userCity">
        <el-icon> <Position /> </el-icon>{{ UserData.city }}
      </p>
    </div>
    <div class="UserData">
      <div class="UserLogo">
        <img
          class="logo"
          v-if="UserData.user_pic"
          :src="UserData.user_pic"
          alt="用户头像"
        />
        <img class="logo" v-else :src="defaultUserLogo" alt="用户头像" />
      </div>
      <div class="Content">
        <div class="ContentTitle">
          <h3>
            {{ UserData.username }}
          </h3>
          <p class="phone-none">
            <el-icon v-if="UserData.sex === '男'">
              <Female />
            </el-icon>
            <el-icon v-else>
              <Male />
            </el-icon>
          </p>
        </div>
        <p class="ContentText">
          {{ UserData.user_content }}
        </p>
        <nuxt-link class="EditUserData" to="/Users" v-if="isSelf"
          >编辑个人资料</nuxt-link
        >
        <el-button
          class="followBtn"
          v-if="!relation && !isSelf"
          type="primary"
          plain
          @click="addRelation(true)"
        >
          <el-icon>
            <Plus />
          </el-icon>
          &nbsp;关注ta
        </el-button>
        <el-button
          class="followBtn"
          v-if="relation"
          type="primary"
          plain
          @click="addRelation(false)"
          >取消关注
        </el-button>
      </div>
    </div>
    <button class="EditorBgc" @click="EditorBgc" v-if="isSelf">
      编辑封面图片
    </button>
  </div>
</template>

<style lang="less" scoped>
.EditorBgc {
  position: absolute;
  top: 80px;
  right: 3vw;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(229, 230, 232, 0.217);
  border-radius: 5px;
  z-index: 201;
}

.EditorBgc:hover {
  background-color: rgba(255, 255, 255, 0.308);
}
.UserBox {
  position: relative;
  background-color: #fff;
}
.BgcBox {
  font-size: 2rem;
  padding: 20px;
  overflow: hidden;
  height: 100%;
  text-align: center;
  color: #8f8f8f6e;
}
.BgcBox::after {
  content: '⁶⁶ ⁶⁶⁶⁶⁶⁶   ⁶⁶66 ⁶⁶⁶⁶   ₆₆₆₆  可以啊.这 波  ₆₆₆₆ ⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666 ₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 太牛了⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶';
}
@media only screen and (max-width: 755px) {
  .UserBgc {
    height: 50%;
    width: 100%;
    position: absolute;
    z-index: 10;

    .userCity {
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 5px;
    }
  }

  .UserBox {
    height: 50vh;
  }
  // 头像框
  .UserData {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
    z-index: 200;
    bottom: 40px;
    .Content {
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
    }
    .UserLogo {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      overflow: hidden;
      padding: 5px;
      border: 2px solid rgb(229, 230, 232);
      background-color: #ffffffce;
    }
  }

  .EditUserData {
    position: relative !important;
    margin: 10px;
    bottom: 0;
    left: 0;
  }

  .ContentText {
    padding: 0 !important;
    font-size: 1rem !important;
    margin: 5px 0;
    text-align: center;
  }

  .EditorBgc {
    position: absolute;
    top: 20px;
  }
}
@media only screen and (min-width: 755px) {
  .UserData {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 200;
    bottom: 40px;
    padding-left: 2vw;
  }
  .followBtn {
    position: absolute;
    bottom: 20px;
    right: 30px;
  }
  .UserBox {
    height: 480px;
    max-width: 1200px;
  }
}
.UserBgc {
  height: 60%;
  width: 100%;
  position: absolute;
  z-index: 10;

  .userCity {
    position: absolute;
    right: 15px;
    bottom: 15px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
  }
}

.EditUserData {
  display: inline-block;
  bottom: 10px;
  position: absolute;
  right: 30px;
}
.user_bgc {
  height: 100%;
  width: 100%;
}
.UserLogo {
  height: 150px;
  width: 150px;
  border-radius: 12px;
  overflow: hidden;
  border: 5px solid rgb(255, 255, 255);
  background-color: #ffffffce;
}

.logo {
  width: 100%;
  height: 100%;
}

.Content {
  height: 100%;
  padding-left: 40px;
  position: relative;
  padding-top: 10vh;
  width: 75%;

  .ContentTitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    > h3 {
      font-size: 2rem;
    }

    > p {
      margin-left: 10px;
    }
  }
  .ContentText {
    padding: 15px 0;
    font-size: 1.3rem;
    font-weight: 100;
    word-break: break-all;
    width: 65%;
  }
}
.UserBgc {
  height: 60%;
  width: 100%;
  position: absolute;
  z-index: 10;

  .userCity {
    position: absolute;
    right: 15px;
    bottom: 15px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
  }
}

.user_bgc {
  height: 100%;
  width: 100%;
}

</style>
