<script setup lang="ts">
const tabPosition: any = ref('left')
onMounted(() => {
  if (process.client) {
    if (window.innerWidth < 756) {
      tabPosition.value = 'top'
    }
  }
})
</script>

<template>
  <div class="UserDataBox">
    <el-tabs :tabPosition="tabPosition" type="border-card" class="Usertabs">
      <el-tab-pane label="账号设置">
        <CtrlPanelUserCount></CtrlPanelUserCount>
      </el-tab-pane>
      <el-tab-pane label="个人资料">
        <CtrlPanelUser></CtrlPanelUser>
      </el-tab-pane>
      <el-tab-pane label="隐私设置">
        <CtrlPanelUserPrivacy></CtrlPanelUserPrivacy>
      </el-tab-pane>
      <el-tab-pane label="屏蔽名单">
        <CtrlPanelUserShield></CtrlPanelUserShield>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.UserDataBox,
.Usertabs {
  width: 100%;
  height: 100%;
}
/deep/.el-tabs__content {
  padding: 5px;
}
</style>
