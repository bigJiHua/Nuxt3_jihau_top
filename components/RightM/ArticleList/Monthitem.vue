<script setup lang="ts">
const props = defineProps({
  month: {
    type: Number,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
},)
const misOpen = ref(false)
</script>

<template>
  <div id="" class="month">
    <span class="mnumber" @click="misOpen = !misOpen ">{{ month }}月</span>
    <ol>
      <li :class="{ daylists: misOpen, daylist: !misOpen }" v-for="(obj, index) in data" :key="index">
        <router-link :to="'/article/' + obj.hurl" @click="misOpen = !misOpen">
          {{ obj.title }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<style lang="less" scoped>
.mnumber {
  font-size: 1.5rem;
  margin-left: 20px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  display: block;
  width: 94%;
  background-color: #a8c3ff24;
}

/* 日历和现在时间 */
.daylist {
  display: none;
}

.daylists a {
  text-decoration: none;
  color: rgb(11, 133, 255);
  font-weight: bolder;
}

.daylists:hover {
  background-color: rgb(200, 227, 255);

  >a {
    color: rgb(108, 174, 240);
  }
}

.daylist {
  display: none;
}

.daylists {
  display: block;
  list-style: none;
  line-height: 2rem;
  text-indent: 2.5rem;
}

.daylists ol a {
  text-decoration: none;
  color: rgb(38, 130, 221);
  font-weight: bolder;
}
</style>

