<script setup lang="ts">
// 原有 JS/TS 逻辑保持不变
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});
const id = ref(
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  props.item.article_id ? props.item.article_id : props.item.notify_id,
);
const link = ref(
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  props.item.article_id ? `/article/${id.value}  ` : `/Notify/${id.value}`,
);
const isUser = ref(props.item.user_id ? true : false);
// 计算标签
const tagcmp = (item: string): string[] => {
  if (typeof item !== "string") {
    return item;
  } else {
    return item.split(/[、,，]/);
  }
};

onMounted(() => {
  if (/、/.test(props.item.keyword)) {
    props.item.keyword = props.item.keyword.split("、");
  }
});
</script>

<template>
  <!-- 展示用户listCard -->
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
          <!-- 调整：用户名和标签放在同一行 -->
          <div class="username-tag-wrapper">
            <p class="username">
              <nuxt-link :to="'/space/' + item.username" target="_blank">{{
                item.username
              }}</nuxt-link>
            </p>
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
          </div>
          <div>
            <p class="content">
              {{ item.user_content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 展示文章listCard -->
  <div class="itemarea" v-else>
    <div class="card">
      <div class="card_title">
        <nuxt-link :to="link">
          <h3>{{ item.title }}</h3>
        </nuxt-link>
        <div class="User">
          <nuxt-link :to="{ path: '/space/' + item.username }"> {{ item.username }}</nuxt-link>
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
// 卡片容器
.itemarea {
  background-color: #f8fbff;
  margin: 12px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(70, 142, 230, 0.15);
  border: 1px solid rgba(70, 142, 230, 0.1);
  overflow: hidden; // 替代 scroll，避免不必要的滚动
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(70, 142, 230, 0.2);
    transform: translateY(-2px);
  }
}

// 用户卡片样式
.Usercard {
  padding: 16px;

  .UserData {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .UserImg {
      > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(70, 142, 230, 0.1);
      }
    }

    .UserContent {
      flex: 1;
      min-width: 0; // 防止内容溢出

      // 新增：用户名+标签容器
      .username-tag-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap; // 标签过多时自动换行
        gap: 8px;
        margin-bottom: 8px;
      }

      .username {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #468ee6;

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            color: #2a70d6;
            text-decoration: underline;
          }
        }
      }

      .useridentity {
        margin: 0;
        .tag {
          background-color: rgba(70, 142, 230, 0.1);
          color: #468ee6;
          border: none;
        }
      }

      > div {
        margin-top: 4px;

        .content {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 最多显示2行
          -webkit-box-orient: vertical;
          overflow: hidden;
          // 关键：添加自动换行样式
          word-break: break-all;
          word-wrap: break-word;
        }
      }
    }
  }
}

// 文章卡片样式
.card {
  padding: 16px;

  .card_title {
    margin-bottom: 12px;

    h3 {
      margin: 0 0 4px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
      line-height: 1.4;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: #468ee6;
        }
      }
    }

    .User {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;

      a {
        color: #fb7299;
        text-decoration: none;
        margin-right: 4px;

        &:hover {
          color: #e85882;
        }
      }

      > span {
        display: inline-block;
      }
    }
  }

  article {
    margin-bottom: 12px;
    font-size: 14px;
    color: #666;
    line-height: 1.6;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #468ee6;
      }
    }

    // 内容最多显示3行
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .details {
    .tag-title {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }

    .tag {
      background-color: rgba(70, 142, 230, 0.08);
      color: #468ee6;
      border: none;
    }

    p {
      margin: 0 0 4px 0;
    }
  }
}

// 响应式适配
@media only screen and (min-width: 768px) {
  .card .details {
    display: flex;
    gap: 16px;
    align-items: center;
  }
}

@media only screen and (max-width: 767px) {
  .itemarea {
    margin: 8px 0;
  }

  .Usercard, .card {
    padding: 12px;
  }

  .UserImg > img {
    width: 48px !important;
    height: 48px !important;
  }

  .card .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>