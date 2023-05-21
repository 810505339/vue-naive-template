<script setup lang="ts">
import { instance } from '~/api'
// 热歌榜
const { data } = useAxios('/playlist/detail?id=3778678', instance)
const playList = computed(() => {
  return data.value?.playlist?.tracks.slice(0, 4)
})
</script>

<template>
  {{ playList }}
  <div fixed z-10 w="400px" right="0" top="80px" rounded-tl-3xl h="100%" bg=" white dark:#18181c" px="24px" pt="32px">
    <div flex items-center justify-between>
      <span text-18px font-600>TOP 100 WEEKLY</span>
      <span text-14px text="#787887">MORE LIST</span>
    </div>
    <div>
      <div v-for="(play,i) in playList" :key="play.id" flex items-center w="100%" justify-evenly py-12px my-12px>
        <span mr-15px text="#787887">0{{ i+1 }}</span>
        <img
          :src="play.al.picUrl" w="50px" h="50px" mr-8px
          rounded
        >
        <div basis="1/2">
          <div font-600 text-16px>
            {{play.name}}
          </div>
          <div text="#787887 13px">
            {{play.ar}}
          </div>
        </div>
        <span text-13px text="#787887">03:11</span>
        <i icon-btn i-heroicons:ellipsis-vertical-20-solid text-18px font-600 />
      </div>
    </div>
  </div>
</template>
x
