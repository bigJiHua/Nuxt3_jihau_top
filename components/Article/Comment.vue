<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import UserAction from "@/api/Article/Action";
import getArticleApi from "@/api/Article";
const ArtComData = ref({
  comment: [
    {
      username: "",
      comment: "",
      pub_date: "",
    },
  ],
  iscom: false,
  isshow: false
});

const router = useRouter();
const route = useRoute();
const comTXT: any = ref("");
// 发表评论
const commont = async (): Promise<void> => {
  const artid = route.params.id as string;
  if (localStorage.getItem("Username") === null) {
    if (await WarningTips("登录后才能操作哦！是否跳转登录？")) {
      setLocal(true);
      void router.push("/Login/art");
    } else return;
  } else {
    if (artid === undefined) {
      ElMessage({
        message: "获取文章id错误，请刷新当前页面",
        type: "warning",
      });
    } else {
      if (comTXT.value === "") {
        ElMessage({
          message: "留言输入内容不能为空哦!",
          type: "warning",
        });
      } else {
        const comtxt = comTXT.value
          .match(
            /((\p{sc=Han})|([a-zA-Z0-9])|([\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]))/gu,
          )
          .join("");
        const data = {
          username: localStorage.getItem("Username"),
          articleid: artid,
          type: "comment",
          comment: comtxt,
        };
        const { data: res } = await UserAction.UserActive(data);
        if (res.status === 200) {
          const newcom = res.data;
          if (!res.ischeck) {
            ArtComData.value.comment.unshift(newcom);
          } else {
            ElMessage.info("请等待作者审核该评论后展示");
          }

          comTXT.value = "";
        }
      }
    }
  }
};
const setLocal = (type: boolean): void => {
  if (comTXT.value === "") return;
  const KEY = "comment";
  const EXPIRE = 5 * 60 * 1000; // 5分钟
  if (type) {
    const data = JSON.stringify({
      value: comTXT.value,
      time: Date.now(),
    });
    localStorage.setItem(KEY, data);
  } else {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      comTXT.value = "";
      return;
    }
    const { value, time } = JSON.parse(raw);
    // 缓存结构不完整
    if (!value || !time) {
      comTXT.value = "";
      return;
    }
    // 判断是否过期
    if (Date.now() - Number(time) > EXPIRE) {
      localStorage.removeItem(KEY);
      comTXT.value = "";
    } else {
      comTXT.value = value;
      localStorage.removeItem(KEY);
    }
  }
};

// 获取评论等等...
const getArchives = async (): Promise<void> => {
  try {
    const { data: res } = await getArticleApi.getArtComment(route.params.id as string);
    ArtComData.value.comment = res.data.comment;
    ArtComData.value.iscom = res.data.iscom;
    ArtComData.value.isshow = res.data.isshow;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  void getArchives();
  setLocal(false);
});
</script>

<template>
  <client-only>
    <div class="commentArea" v-if="ArtComData.iscom || ArtComData.isshow">
      <p>
        全部评论
      </p>
      <div class="comListItemArea" v-if="ArtComData.isshow || ArtComData.iscom">
        <div class="comment" v-for="(item, index) in ArtComData.comment" :key="index">
          <p class="comment_user">
            <router-link :to="'/space/' + item.username">{{ item.username }}：</router-link
            >{{ item.comment }}
          </p>
          <p class="comment_time">时间:{{ item.pub_date }}</p>
        </div>
      </div>
      <div class="textarea" v-if="ArtComData.iscom">
        <textarea
          name=""
          id="comtext"
          placeholder="友善发言，留下美好瞬间"
          maxlength="150"
          @keyup.enter="commont()"
          v-model="comTXT"
        ></textarea>
        <el-button type="primary" plain @click="commont()">留言</el-button>
      </div>
    </div>
    <div class="cover_com" v-else>
      <span class="com_tips">已关闭评论</span>
    </div>
  </client-only>
</template>

<style lang="less" scoped>
.commentArea {
  padding: 10px;
  background-color: #f4f8ff; // 浅蓝背景，更柔和
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  p {
    margin: 10px 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #06467a;
  }

  #comtext {
    border-radius: 8px;
    border: 1.5px solid #cce0ff;
    padding: 8px;
    height: 50px;
    width: 100%;
    resize: none;
    font-size: 1rem;
    background-color: #ffffff;
    transition: all 0.3s;
    margin: 10px 0;
    &:focus {
      outline: none;
      border-color: #409eff; // Element Plus 蓝色
      box-shadow: 0 0 5px rgba(64, 158, 255, 0.3);
    }
  }

  .comment {
    background-color: #e6f0ff; // 浅蓝色
    border-left: 3px solid #409eff; // 左边彩条
    border-radius: 5px;
    padding: 8px 12px;
    margin-bottom: 12px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d0e4ff;
    }

    p {
      margin: 0;
      color: #06467a;
    }

    .comment_user {
      font-size: 1.15rem;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .comment_time {
      font-size: 0.75rem;
      text-align: right;
      color: #409eff;
      margin-top: 4px;
    }
  }
}

.textarea {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    float: right;
    margin-left: 10px;
  }
}
.comListItemArea {
  max-height: 70vh;
  width: 100%;
  overflow-y: auto;
}
.com_tips {
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  margin: 2vh 0;
}
.cover_com {
  padding: 20px;
  border: 3px #849bf55e dashed;
  border-radius: 10px;
  user-select: none;
}
</style>
