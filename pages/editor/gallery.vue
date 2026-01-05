<script setup lang="ts">
import {
  Delete,
  DocumentCopy,
  Plus,
  Picture as IconPicture,
} from '@element-plus/icons-vue'
import setdata from '@/api/CtrlMenu/gallery'

definePageMeta({
  layout: 'ctrl-view',
})
const { $copyUrl, $setBase64Avator } = useNuxtApp()
const imgGallery: Ref<any[]> = ref([])
const AllNum: Ref<number> = ref(0)
const isUp = ref(false)
const UploadImg: any = ref(null)
const localNum: Ref<number> = ref(0)
const uploadProgress = ref(0)
const isUploading = ref(false)

// 获取图片分页
const getGallery = async (num: number): Promise<void> => {
  imgGallery.value = []
  const usdata = {
    picusername: localStorage.getItem('Username') as string,
    Num: num,
  }
  const { data: res } = await setdata.getImage(usdata)
  imgGallery.value = res.data
  AllNum.value = res.Num
}

// 复制Url
const copyUrl = (url: string): void => {
  void $copyUrl(url)
}

// 删除照片
const deleteImg = async (id: string) => {
  if (await WarningTips('你确定要删除这张照片码？')) {
    await setdata.delImage(id)
    setTimeout(() => {
      void getGallery(localNum.value)
    }, 1000)
  }
}

// 上传图片
const upImg = async (e: any): Promise<any> => {
  UploadImg.value.clearFiles()
  let uploadImgData = null
  let qNum = 0
  isUploading.value = true
  uploadProgress.value = 0

  if (e.file.size > 1024 * 1024 * 30) {
    isUploading.value = false
    return ElMessage({
      message: '文件超过最大值',
      type: 'error',
    })
  }
  qNum = e.file.size > 1024 * 1024 ? 0.4 : 0.6
  $setBase64Avator(e.file, false, qNum)
    .then(async (res: any) => {
      uploadImgData = res

      const fakeProgress = setInterval(() => {
        if (uploadProgress.value < 90) {
          uploadProgress.value += 10
        }
      }, 150)

      if (uploadImgData !== null) {
        const { data: res } = await setdata.upImage(uploadImgData)
        clearInterval(fakeProgress)
        uploadProgress.value = 100

        if (res.status === 200) {
          setTimeout(() => {
            UploadImg.value.clearFiles()
            void getGallery(0)
            isUploading.value = false
            uploadProgress.value = 0
          }, 500)
        }
      }
    })
    .catch((err) => {
      isUploading.value = false
      ElNotification({
        title: '错误',
        message: err,
        type: 'warning',
      })
    })
}

// 分页相关
const pageChanged = (page: number) => {
  localNum.value = (page - 1) * 20
  void getGallery(localNum.value)
}
useHead({
  title: '我的图库',
})

onMounted(() => {
  void getGallery(0)
})
</script>
<template>
  <div class="MyGalleryList">
    <div class="GalleryListArea">
      <div class="galleryItem">
        <div class="uploadImg" @click="isUp = true">
          <el-upload
            class="upload-demo"
            ref="UploadImg"
            drag
            :multiple="false"
            :limit="1"
            :http-request="upImg"
            accept="image/*"
          >
            <el-icon class="el-icon--upload">
              <Plus />
            </el-icon>
            <div class="el-upload__text">
              拖拽文件或<em>点击上传</em> jpg/png 格式 不超过 5M
            </div>
            <!-- 上传进度条 -->
            <el-progress
              v-if="isUploading"
              :percentage="uploadProgress"
              :text-inside="true"
              :stroke-width="16"
              color="#409eff"
              status="success"
              style="margin-top: 10px"
            />
          </el-upload>
        </div>
      </div>

      <div class="galleryItem" v-for="(item, index) in imgGallery" :key="index">
        <el-image
          class="galleryImg"
          :src="item.userimage"
          fit="cover"
          lazy
          style="width: 100%; height: 100%"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
              <span style="font-size: 0.8rem">加载失败...</span>
            </div>
          </template>
        </el-image>

        <div class="shadow">
          <el-icon @click="deleteImg(item.id)">
            <Delete />
          </el-icon>
          <el-icon @click="copyUrl(item.userimage)">
            <DocumentCopy />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="pagBtnArea">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="AllNum"
        :default-page-size="20"
        @current-change="pageChanged"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.MyGalleryList {
  height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

.pagBtnArea {
  display: flex;
  justify-content: center;
  padding: 5px;
}

.GalleryListArea {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: calc(100vh - 100px);
  justify-content: space-between;
  align-items: flex-start;
}

.galleryItem {
  width: 200px;
  height: 150px;
  padding: 5px;
  margin: 10px;
  position: relative;
  box-shadow: 0px 0px 9px -2px rgb(189 189 189);

  .shadow {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
    transition: opacity 0.3s;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .uploadImg {
    width: 100%;
    height: 100%;

    :deep(.upload-demo),
    :deep(.el-upload),
    :deep(.el-upload-dragger) {
      height: 100%;
      width: 100%;
    }
    .el-icon {
      font-size: 2rem;
    }

    .el-upload__tip {
      padding: 10px;
    }
  }

  > .galleryImg {
    width: 100%;
    height: 100%;
  }

  &:hover .shadow {
    opacity: 1;
    animation: shadowUp 0.2s linear;
  }
}

@keyframes shadowUp {
  from {
    height: 0%;
  }

  to {
    height: 100%;
  }
}

@media screen and (max-width: 755px) {
  .MyGalleryList {
    width: 95vw;
    margin: 0 auto;
  }

  .GalleryListArea {
    height: 88vh;
  }

  .galleryItem {
    width: 170px;
    height: 150px;
    padding: 5px;
    margin: 5px;
  }
}

.MyGalleryList::-webkit-scrollbar {
  display: none;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 1.8rem;
}
</style>
