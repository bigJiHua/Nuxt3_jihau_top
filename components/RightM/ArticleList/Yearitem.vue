<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  AllData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const isOpen = ref(true)
</script>

<template>
  <div id="">
    <span class="list_year" @click.prevent="isOpen=!isOpen">{{ props.AllData[index].year }}年</span>
    <div :class="{ list_down: isOpen, 'list_open': !isOpen }" id="new_article_list_m">
      <RightMArticleListMonthitem v-for="art in props.AllData[index].data" :key="art" :month="art.month" :year="art.year"/>
    </div>
  </div>
</template>

<style lang="less" scoped>
span.list_year {
  font-size: 2rem;
  font-weight: 600;
  font-style: oblique;
  color: rgb(34, 32, 30);
  display: block;
  width: 100%;
  background-color: #d4dff029;
}

.list_down {
  height: 0;
  overflow: hidden;
}

.list_open {
  font-weight: 500;
}
</style>

function defineProps(arg0: { year: { type: NumberConstructor; default: number }; AllData: { type: ArrayConstructor; default: () => never[] } }) {
  throw new Error("Function not implemented.")
}
