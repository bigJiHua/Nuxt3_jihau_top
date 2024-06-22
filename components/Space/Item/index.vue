<script setup lang="ts">
import GetUData from '@/api/User'
import { Plus, Female, Male, Position } from '@element-plus/icons-vue'
const props = defineProps({
  data: {
    type: Object,
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
const UserData: Ref<object> = ref(props.data)
const isSelf: Ref<boolean> = ref(props.isSelf)
const relation: Ref<boolean> = ref(false)
const defaultUserLogo: Ref<string> = ref(
  'data:image/png;base64,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'
)
// 编辑用户背景图片
const EditorBgc = (): void => {
  const bgcOrigin =  ref(UserData.value.user_bgc)
  if (!isSelf.value) return
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
          type: 'Error',
          message: '参数错误',
        })
        return
      }
      const data = {
        user_bgc: value
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
  if (localStorage.getItem('Username') === null) {
    ElMessage({
      message: '请登录',
      type: 'warning',
    })
  } else {
    if (props.data.username === '') return
    if (!met) relation.value = true
    relation.value = !relation.value
    const res = await fllowMe.AddRelation(props.data.username)
    if (!(res as boolean)) {
      relation.value = false
    } else {
      setTimeout(() => {
        void getRelation()
      }, 1000)
    }
  }
}
// 获取用户关系
const getRelation = async (): Promise<void> => {
  // 获取用户关系
  if (localStorage.getItem('Username') !== null && !props.isSelf) {
    const res = await fllowMe.SelectRelation(props.data.username)
    relation.value = res as boolean
  }
}
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
  font-size: 1.2rem;
  padding: 20px;
  overflow: hidden;
  height: 100%;
  text-align: center;
}
.BgcBox::after {
  content: '⁶⁶ ⁶⁶⁶⁶⁶⁶   ⁶⁶66 ⁶⁶⁶⁶   ₆₆₆₆  可以啊.这 波  ₆₆₆₆ ⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666 ₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶';
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
    margin-top: 180px;
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
    padding-top: 20vh;
    padding-left: 2vw;
  }
  .followBtn {
    position: absolute;
    bottom: 20px;
    right: 30px;
  }
  .UserBox {
    height: 50vh;
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
    padding: 15px 15px 15px 0;
    font-size: 1.3rem;
    font-weight: 100;
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
    padding: 15px 15px 15px 0;
    font-size: 1.3rem;
    font-weight: 100;
  }
}
</style>
